/* eslint-disable import/first no-var-requires */
require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.use(
      rateLimit({
          windowMs: 5 * 60 * 1000, // 5 minutes
          max: 250, // limit each IP to 250 requests per windowMs
      }),
  );
  await app.listen(process.env.PORT || 3000, process.env.HOST || undefined);
}
bootstrap();
