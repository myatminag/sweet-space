import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dataSouceOption } from './datasource';

@Module({
  imports: [TypeOrmModule.forRoot(dataSouceOption)],
})
export class DbModule {}
