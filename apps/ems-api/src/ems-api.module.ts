import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmsApiController } from './ems-api.controller';
import { EmsApiService } from './ems-api.service';
import { AuthModule } from './modules/auth/auth.module';
import { TrackingModule } from './modules/tracking/tracking.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { MeetingsModule } from './modules/meetings/meetings.module';
import { UsersModule } from './modules/users/users.module';

import { SharedModule } from '../../core-api/src/shared/shared.module';

@Module({
  imports: [
    (ConfigModule.forRoot({ isGlobal: true }) as any),
    SharedModule,
    AuthModule,
    TrackingModule,
    TasksModule,
    MeetingsModule,
    UsersModule
  ],
  controllers: [EmsApiController],
  providers: [EmsApiService],
})
export class EmsApiModule { }
