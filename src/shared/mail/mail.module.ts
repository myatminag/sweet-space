import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { MailService } from './mail.service';
import { mailConfig } from 'src/configs/mail-config';

@Module({
  imports: [MailerModule.forRoot(mailConfig)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
