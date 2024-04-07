import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

import { EnvVariables } from 'src/utils/types';

config();

const configService = new ConfigService<EnvVariables>();

export const dataSouceOption: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
};

export const AppDataSource = new DataSource(dataSouceOption);
