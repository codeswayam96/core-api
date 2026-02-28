import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());

    // Allow cross-origin requests with credentials (cookies)
    app.enableCors({
        origin: (origin: string, callback: (err: Error | null, allow?: boolean) => void) => {
            // 1. Allow requests with no origin (like mobile apps or curl)
            if (!origin) return callback(null, true);

            // 2. Define the regex for your domain and subdomains
            const allowedDomain = /^(https?:\/\/)?(.*\.)?codeswayam\.com$/;

            // 3. Check if the current origin matches or is localhost for development
            if (allowedDomain.test(origin) || origin.includes('localhost')) {
                callback(null, true);
            } else {
                console.error(`CORS blocked for origin: ${origin}`); // Debugging line
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });

    const port = process.env.PORT || 3000;
    await app.listen(port, '0.0.0.0');
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
