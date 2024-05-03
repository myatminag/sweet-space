import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { DbModule } from '@db/db.module';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { S3Module } from '@shared/s3/s3.module';
import { MailModule } from '@shared/mail/mail.module';
import { PropertiesModule } from '@modules/properties/properties.module';
import { FlightsModule } from '@modules/flights/flights.module';
import { CarRentalsModule } from '@modules/car-rentals/car-rentals.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    S3Module,
    MailModule,
    PropertiesModule,
    FlightsModule,
    CarRentalsModule,
    DbModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
