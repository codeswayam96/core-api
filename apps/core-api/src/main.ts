import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());

    // Allow cross-origin requests with credentials (cookies)
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'https://app.codeswayam.com',
            'https://account.codeswayam.com',
            'https://mailtracker.codeswayam.com',
            'https://auraflow.codeswayam.com'
        ],
        credentials: true,
    });
    await app.listen(3000);
}
bootstrap();
