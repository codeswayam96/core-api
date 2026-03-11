import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from '@core/database';
import { AuthModule } from './modules/auth/auth.module';
import { AuraApiController } from './aura-api.controller';
import { AuraApiService } from './aura-api.service';
import { AutomationsModule } from './modules/automations/automations.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';

@Module({
  imports: [
    (ConfigModule.forRoot({
      isGlobal: true,
    }) as any),
    (AuthModule as any),
    (DrizzleModule as any),
    AutomationsModule,
    IntegrationsModule,
    WebhooksModule,
  ],
  controllers: [AuraApiController],
  providers: [AuraApiService],
})
export class AuraApiModule { }
