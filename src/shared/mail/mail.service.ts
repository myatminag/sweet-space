import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { MailData } from './types/mail';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async forgotPasswordMail(data: MailData, token: string) {
    return await this.mailerService.sendMail({
      to: data.email,
      subject: 'Reset Password',
      template: './forgot-password',
      context: {
        name: data.full_name,
        date: new Date().getFullYear(),
        resetLink: `https://localhost:3000?userId=${data.user_id}&token=${token}`,
      },
    });
  }
}
