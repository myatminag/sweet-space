import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import basicAuth from 'express-basic-auth';

import { AppModule } from './app.module';
import { EnvVariables } from 'src/libs/types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService<EnvVariables>>(ConfigService);

  const APP_ROUTE_PREFIX = '/api/v1';

  app.enableCors();

  app.setGlobalPrefix(APP_ROUTE_PREFIX);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  if (process.env.NODE_ENV !== 'development') {
    app.use(
      `${APP_ROUTE_PREFIX}/*`,
      basicAuth({
        challenge: true,
        users: {
          sweetSpace: configService.get('SWAGGER_PASSWORD'),
        },
      }),
    );
  }

  const config = new DocumentBuilder()
    .setTitle('Sweet Space')
    .setDescription('The Sweet Space Api Documentation')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .addSecurityRequirements('bearer')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${APP_ROUTE_PREFIX}/docs`, app, document);

  const port = configService.get('APP_PORT');
  await app.listen(port);
}
bootstrap();
