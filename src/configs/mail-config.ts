import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

import { EnvVariables } from 'src/libs/types';

const configService = new ConfigService<EnvVariables>();

export const mailConfig: MailerOptions = {
  transport: {
    host: configService.get('MAIL_HOST'),
    port: configService.get('MAIL_PORT'),
    ignoreTLS: true,
    secure: true,
    service: 'Gmail',
    auth: {
      user: configService.get('MAIL_USER'),
      pass: configService.get('MAIL_PASSWORD'),
    },
  },
  defaults: {
    from: '"Sweet Space" <no-reply@sweetspace.com>',
  },
  preview: true,
  template: {
    dir: process.cwd() + '/src/modules/mail/templates',
    adapter: new EjsAdapter(),
    options: {
      strict: true,
    },
  },
};
