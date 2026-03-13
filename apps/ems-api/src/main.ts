import { NestFactory } from '@nestjs/core';
import { EmsApiModule } from './ems-api.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(EmsApiModule);

  app.use(cookieParser());

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

  // Render injects PORT; fallback to EMS_PORT for local dev
  const port = process.env.PORT || process.env.EMS_PORT || 3004;
  await app.listen(port, '0.0.0.0');
  console.log(`[ems-api] Server running on port ${port}`);
}
bootstrap();

