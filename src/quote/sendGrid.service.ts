import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { PrismaService } from '@src/database/prisma.service';
import { SendEmailTemplate, SendEmailTest } from '@src/interfaces/types';

@Injectable()
export class SendGridService {
  private logger: Logger;
  private confirmation_template_id: string;
  private from: string;

  constructor(
    private configService: ConfigService,
    readonly prisma: PrismaService,
  ) {
    this.logger = new Logger(SendGridService.name);

    const sendGridConfing = this.configService.get('sendGrid');
    const mail = this.configService.get('mail').user;

    this.confirmation_template_id = sendGridConfing.confirmation_template_id;
    this.from = mail;

    SendGrid.setApiKey(sendGridConfing.key);
  }

  async send(mail: SendGrid.MailDataRequired): Promise<void> {
    try {
      await SendGrid.send(mail);
      this.logger.log(`Email successfully dispatched to ${mail.to as string}`);
    } catch (error) {
      this.logger.error('Error while sending email', error);
      throw error;
    }
  }

  async sendTestEmail({
    recipient,
    body = 'This is a test mail to the template',
  }: SendEmailTest): Promise<void> {
    const mail: SendGrid.MailDataRequired = {
      to: recipient,
      from: this.from,
      subject: 'Test email',
      content: [{ type: 'text/plain', value: body }],
    };

    await this.send(mail);
  }

  async sendEmailWithTemplate({
    recipient,
    body,
    subject,
  }: SendEmailTemplate): Promise<void> {
    const mail: SendGrid.MailDataRequired = {
      to: recipient,
      from: this.from,
      subject: subject,
      templateId: this.confirmation_template_id,
      dynamicTemplateData: { ...body },
    };

    await this.send(mail);
  }
}
