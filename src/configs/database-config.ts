import { join } from 'path';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

import { EnvVariables } from 'src/lib/types';

config();

const configService = new ConfigService<EnvVariables>();

export const dataSouceOption: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  synchronize: true,
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  logging: true,
};

export const AppDataSource = new DataSource(dataSouceOption);
