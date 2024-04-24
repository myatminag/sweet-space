import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

import { dataSouceOption } from '@/configs/database-config';
import { AuthModule } from '@/modules/auth/auth.module';
import { PropertyModule } from '@/modules/property/property.module';
import { UserModule } from '@/modules/user/user.module';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { S3Module } from '@/modules/s3/s3.module';
import { RegionModule } from '@/modules/region/region.module';
import { CategoryModule } from '@/modules/category/category.module';

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
    S3Module,
    RegionModule,
    CategoryModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
