import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { SaasProductsModule } from './modules/saas-products/saas-products.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        BullModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                connection: {
                    host: configService.get('REDIS_HOST') || 'localhost',
                    port: parseInt(configService.get('REDIS_PORT') || '6379'),
                    password: configService.get('REDIS_PASSWORD'),
                    tls: configService.get('REDIS_TLS') === 'true' ? {} : undefined,
                },
            }),
            inject: [ConfigService],
        }),
        SharedModule,
        AuthModule,
        UsersModule,
        AdminModule,
        BlogsModule,
        SaasProductsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
