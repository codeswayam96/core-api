import { Controller, Get, Post, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('integrations')
@UseGuards(JwtAuthGuard)
export class IntegrationsController {
    constructor(private readonly integrationsService: IntegrationsService) { }

    @Get('instagram/posts')
    getInstagramPosts(@Req() req) {
        return this.integrationsService.getInstagramPosts(req.user.userId);
    }

    @Delete(':id')
    disconnectIntegration(@Param('id') id: string, @Req() req) {
        return this.integrationsService.disconnectIntegration(id, req.user.userId);
    }

    @Post()
    createIntegration(@Body() data: any, @Req() req) {
        return this.integrationsService.createIntegration({
            ...data,
            userId: req.user.userId
        });
    }
}
