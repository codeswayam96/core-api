import { Module } from '@nestjs/common';
import { DrizzleModule } from '@core/database';
import { AutomationsController } from './automations.controller';
import { AutomationsService } from './automations.service';

@Module({
  imports: [DrizzleModule],
  controllers: [AutomationsController],
  providers: [AutomationsService]
})
export class AutomationsModule { }
