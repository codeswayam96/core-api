import { Controller, Post, Get, Body, Param, UseGuards, Request, Patch } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('meetings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MeetingsController {
    constructor(private readonly meetingsService: MeetingsService) { }

    @Post()
    @Roles('manager', 'team_leader', 'cto', 'cfo', 'coo', 'ceo', 'admin') // Interns cannot schedule meetings except if TL specifically allows, but per prompt TL schedules for interns
    async createMeeting(@Body() body: any, @Request() req) {
        return this.meetingsService.createMeeting(req.user.id, body);
    }

    @Get()
    async getAllMeetings() {
        return this.meetingsService.getMeetings();
    }

    @Get(':id')
    async getMeeting(@Param('id') id: string) {
        return this.meetingsService.getMeetingById(Number(id));
    }

    @Patch(':id/status')
    @Roles('manager', 'team_leader', 'cto', 'cfo', 'coo', 'ceo', 'admin')
    async updateStatus(@Param('id') id: string, @Body('status') status: any) {
        return this.meetingsService.updateMeetingStatus(Number(id), status);
    }
}
