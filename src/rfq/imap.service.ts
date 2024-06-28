import { Injectable, OnModuleInit } from '@nestjs/common';
import { Service } from '@src/common/classes/service.class';
import { RfqService } from './rfq.service';
import { PrismaService } from '@src/database/prisma.service';
import * as Imap from 'imap';
import { simpleParser } from 'mailparser';
import { ConfigService } from '@nestjs/config';
import { errorCodes } from '@src/constants/errors';

@Injectable()
export class ImapService extends Service implements OnModuleInit {
  imap: Imap;
  constructor(
    readonly prisma: PrismaService,
    private rfqService: RfqService,
    private configService: ConfigService,
  ) {
    super(prisma);
  }

  onModuleInit() {
    const { user, pass, host, port } = this.configService.get('mail');
    if (!user || !pass || !host || !port) {
      throw new Error(errorCodes.EMAIL_CONNECTION_LOST);
    }

    this.imap = new Imap({
      user: user,
      password: pass,
      host: host,
      port: port,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
    });

    this.imap.once('ready', () => {
      console.log('Successfully connected to the mail server.');

      // open mail inbox
      this.openInbox((err) => {
        if (err) throw Error('Error opening inbox' + err);

        // listen for the new mails
        this.imap.on('mail', () => {
          this.fetchUnreadMails();
        });

        // fetch all unread emails
        this.fetchUnreadMails();
      });
    });

    this.imap.once('error', (err: string) => {
      throw Error('Error conecting to the mail server' + err);
    });

    this.imap.once('end', () => {
      console.log('Mail server connection ended');
    });

    this.imap.connect();
  }

  // function to open the mail inbox
  openInbox(action: (err: Error) => void) {
    this.imap.openBox('INBOX', false, action);
  }

  // function to get and process the mail
  fetchUnreadMails() {
    // Search for unseen (unread) emails
    this.imap.search(['UNSEEN'], (err, results) => {
      if (err) throw Error('Error searching unseen mails' + err);
      if (results.length > 0) {
        // Fetch the unread emails
        const fetch = this.imap.fetch(results, { bodies: '', markSeen: true });
        fetch.on('message', (msg) => {
          msg.on('body', (stream) => {
            // Collect the stream data
            let buffer = '';
            stream.on('data', (chunk) => {
              buffer += chunk.toString('utf8');
            });
            stream.on('end', () => {
              // Parse the email
              simpleParser(buffer, (err, mail) => {
                if (err) {
                  throw new Error('Error parsing mail:' + err);
                }

                this.rfqService.create({
                  subject: mail.subject,
                  text: mail.text,
                  html: mail.html || '',
                  email: mail.from.value[0],
                });
              });
            });
          });
        });
        fetch.once('error', (err) => {
          throw Error('Fetch mail error:' + err);
        });
        fetch.once('end', () => {
          console.log('Done fetching all unseen mails.');
        });
      } else {
        console.log('No new unread emails.');
      }
    });
  }
}
