/* eslint-disable prettier/prettier */

import * as crypto from 'crypto';

if (!global.crypto) {
  Object.defineProperty(global, 'crypto', {
    value: crypto.webcrypto,
  });
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,        
    transform: true,               
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
