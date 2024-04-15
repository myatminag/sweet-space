import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from '@/modules/auth/auth.module';
import { PropertyModule } from '@/modules/property/property.module';
import { UserModule } from '@/modules/user/user.module';
import { dataSouceOption } from '@/configs/database-config';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    AuthModule,
    PropertyModule,
    UserModule,
    TypeOrmModule.forRoot(dataSouceOption),
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
