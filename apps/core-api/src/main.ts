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
            'https://codeswayam.com',
            /^https:\/\/(.*\.)?codeswayam\.com$/
        ],
        credentials: true,
    });

    const port = process.env.PORT || 3000;
    await app.listen(port, '0.0.0.0');
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
