"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const aura_api_module_1 = require("./aura-api.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(aura_api_module_1.AuraApiModule);
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin)
                return callback(null, true);
            const allowedDomain = /^(https?:\/\/)?(.*\.)?codeswayam\.com$/;
            if (allowedDomain.test(origin) || origin.includes('localhost')) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    const port = process.env.PORT || process.env.AURA_API_PORT || 3005;
    await app.listen(port, '0.0.0.0');
    console.log(`[aura-api] Server running on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map