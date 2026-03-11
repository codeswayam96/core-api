import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { AutomationsService } from './automations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('automations')
@UseGuards(JwtAuthGuard)
export class AutomationsController {
    constructor(private readonly automationsService: AutomationsService) { }

    @Get()
    getUserAutomations(@Req() req) {
        return this.automationsService.getUserAutomations(req.user.userId);
    }

    @Get(':id')
    getAutomation(@Param('id') id: string, @Req() req) {
        return this.automationsService.getAutomation(id, req.user.userId);
    }

    @Post()
    createAutomation(@Req() req) {
        return this.automationsService.createAutomation(req.user.userId);
    }

    @Put(':id')
    updateAutomation(@Param('id') id: string, @Body() data: any, @Req() req) {
        return this.automationsService.updateAutomation(id, req.user.userId, data);
    }

    @Delete(':id')
    deleteAutomation(@Param('id') id: string, @Req() req) {
        return this.automationsService.deleteAutomation(id, req.user.userId);
    }
}
