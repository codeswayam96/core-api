import { Controller, Get, Patch, Param, Body, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('dashboard')
    @Roles('admin', 'superadmin')
    async getDashboard() {
        return this.adminService.getDashboard();
    }

    @Get('analytics')
    @Roles('admin', 'superadmin')
    async getAnalytics(@Query('range') range: string = '30d') {
        return this.adminService.getAnalytics(range);
    }

    @Get('users')
    @Roles('admin', 'superadmin')
    async listUsers() {
        return this.adminService.listUsers();
    }

    @Patch('users/:id/role')
    @Roles('superadmin')
    async updateUserRole(
        @Param('id', ParseIntPipe) id: number,
        @Body('role') role: string
    ) {
        return this.adminService.updateUserRole(id, role);
    }

    @Patch('users/:id/status')
    @Roles('admin', 'superadmin')
    async updateUserStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status') status: string
    ) {
        return this.adminService.updateUserStatus(id, status);
    }

    @Get('settings/auth')
    @Roles('admin', 'superadmin')
    async getAuthSettings() {
        return this.adminService.getAuthSettings();
    }

    @Patch('settings/auth')
    @Roles('superadmin')
    async updateAuthSettings(@Body('authType') authType: string) {
        return this.adminService.updateAuthSettings(authType);
    }
}
