import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async forgotPasswordMail(data: any) {
    await this.mailerService.sendMail({
      to: data.email,
      subject: 'Reset Password',
      template: './forgot-password',
      context: {
        name: data.full_name,
        date: new Date().getFullYear(),
        referer: 'www.google.com',
      },
    });
  }
}
