import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { AutomationsService } from './automations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('automations')
@UseGuards(JwtAuthGuard)
export class AutomationsController {
    constructor(private readonly automationsService: AutomationsService) { }

    @Get()
    getUserAutomations(@Req() req) {
           return this.automationsService.getUserAutomations(Number(req.user.userId));
    }

    @Get(':id')
    getAutomation(@Param('id') id: string, @Req() req) {
           return this.automationsService.getAutomation(id, Number(req.user.userId));
    }

    @Post()
    createAutomation(@Body() data: any, @Req() req) {
           return this.automationsService.createAutomation(Number(req.user.userId), data?.name);
    }

    @Put(':id')
    updateAutomation(@Param('id') id: string, @Body() data: any, @Req() req) {
           return this.automationsService.updateAutomation(id, Number(req.user.userId), data);
    }

    @Delete(':id')
    deleteAutomation(@Param('id') id: string, @Req() req) {
           return this.automationsService.deleteAutomation(id, Number(req.user.userId));
    }
}
