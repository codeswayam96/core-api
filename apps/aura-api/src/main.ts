import { NestFactory } from '@nestjs/core';
import { AuraApiModule } from './aura-api.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AuraApiModule);

  app.enableCors({
    origin: [
      'http://localhost:3000', // core-api & web
      'http://localhost:3003', // auth portal
      'http://localhost:3004', // auraflow web
      /\.codeswayam\.com$/,
    ],
    credentials: true,
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = process.env.AURA_API_PORT || 3005;
  await app.listen(port);
  console.log(`[aura-api] Server running on port ${port}`);
}
bootstrap();
