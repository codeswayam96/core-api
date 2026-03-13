import { NestFactory } from '@nestjs/core';
import { AuraApiModule } from './aura-api.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AuraApiModule);

  app.enableCors({
    origin: (origin: string, callback: (err: Error | null, allow?: boolean) => void) => {
      if (!origin) return callback(null, true);
      const allowedDomain = /^(https?:\/\/)?(.*\.)?codeswayam\.com$/;
      if (allowedDomain.test(origin) || origin.includes('localhost')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
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

  // Render injects PORT; fallback to AURA_API_PORT for local dev
  const port = process.env.PORT || process.env.AURA_API_PORT || 3005;
  await app.listen(port, '0.0.0.0');
  console.log(`[aura-api] Server running on port ${port}`);
}
bootstrap();

