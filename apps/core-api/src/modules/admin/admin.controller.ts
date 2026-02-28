import { Controller, Get, Patch, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('users')
    @Roles('admin', 'superadmin')
    async listUsers() {
        return this.adminService.listUsers();
    }

    @Patch('users/:id/role')
    @Roles('superadmin') // Only superadmin can change roles
    async updateUserRole(
        @Param('id', ParseIntPipe) id: number,
        @Body('role') role: 'user' | 'admin' | 'superadmin'
    ) {
        return this.adminService.updateUserRole(id, role);
    }
}
