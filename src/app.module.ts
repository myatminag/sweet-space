import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { PropertyModule } from './modules/property/property.module';
import { UserModule } from './modules/user/user.module';
import { dataSouceOption } from './config/database-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRoot(dataSouceOption),
    AuthModule,
    PropertyModule,
    UserModule,
  ],
})
export class AppModule {}
