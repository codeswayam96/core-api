import { Module } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { MeetingsController } from './meetings.controller';
import { MeetingsGateway } from './meetings.gateway';

@Module({
  providers: [MeetingsService, MeetingsGateway],
  controllers: [MeetingsController]
})
export class MeetingsModule {}
