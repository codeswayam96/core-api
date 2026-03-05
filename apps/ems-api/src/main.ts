import { NestFactory } from '@nestjs/core';
import { EmsApiModule } from './ems-api.module';

async function bootstrap() {
  const app = await NestFactory.create(EmsApiModule);
  await app.listen(process.env.EMS_PORT ?? 3004);
}
bootstrap();
