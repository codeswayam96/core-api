import { Module } from '@nestjs/common';
import { DrizzleModule } from '@core/database';
import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';

@Module({
  imports: [DrizzleModule],
  controllers: [WebhooksController],
  providers: [WebhooksService]
})
export class WebhooksModule { }
