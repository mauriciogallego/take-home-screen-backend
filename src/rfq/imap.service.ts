import { Injectable, OnModuleInit } from '@nestjs/common';
import { Service } from '@src/common/classes/service.class';
import { RfqService } from './rfq.service';
import { PrismaService } from '@src/database/prisma.service';
import * as Imap from 'imap';
import { simpleParser } from 'mailparser';

@Injectable()
export class ImapService extends Service implements OnModuleInit {
  constructor(
    readonly prisma: PrismaService,
    private rfqService: RfqService,
  ) {
    super(prisma);
  }

  onModuleInit() {
    const mailUser = process.env.MAIL_USER;
    const mailPass = process.env.MAIL_PASS;

    if (!mailUser) {
      throw new Error('user mail is missing');
    }

    if (!mailPass) {
      throw new Error('mail password is missing');
    }

    const imap = new Imap({
      user: mailUser,
      password: mailPass,
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
    });

    // function to open the mail inbox
    function openInbox(action) {
      imap.openBox('INBOX', false, action);
    }

    const self = this;

    // function to get and process the mail
    function fetchUnreadMails() {
      // Search for unseen (unread) emails
      imap.search(['UNSEEN'], (err, results) => {
        if (err) throw Error('Error searching unseen mails' + err);
        if (results.length > 0) {
          // Fetch the unread emails
          const fetch = imap.fetch(results, { bodies: '', markSeen: true });
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

                  self.rfqService.create({
                    subject: mail.subject,
                    text: mail.text,
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

    imap.once('ready', () => {
      console.log('Successfully connected to the mail server.');

      // open mail inbox
      openInbox((err) => {
        if (err) throw Error('Error opening inbox' + err);

        // listen for the new mails
        imap.on('mail', () => {
          fetchUnreadMails();
        });

        // fetch all unread emails
        fetchUnreadMails();
      });
    });

    imap.once('error', (err) => {
      throw Error('Error conecting to the mail server' + err);
    });

    imap.once('end', () => {
      console.log('Mail server connection ended');
    });

    imap.connect();
  }
}
