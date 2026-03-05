import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tracking')
@UseGuards(JwtAuthGuard)
export class TrackingController {
    constructor(private readonly trackingService: TrackingService) { }

    @Post('session/start')
    async startSession(@Request() req) {
        return this.trackingService.startSession(req.user.id);
    }

    @Post('session/end')
    async endSession(@Body('sessionId') sessionId: number) {
        return this.trackingService.endSession(sessionId);
    }
}
