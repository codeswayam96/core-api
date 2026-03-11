"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const aura_api_module_1 = require("./aura-api.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(aura_api_module_1.AuraApiModule);
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://localhost:3003',
            'http://localhost:3004',
            /\.codeswayam\.com$/,
        ],
        credentials: true,
    });
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    const port = process.env.AURA_API_PORT || 3005;
    await app.listen(port);
    console.log(`[aura-api] Server running on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map