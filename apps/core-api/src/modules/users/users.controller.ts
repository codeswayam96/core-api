import { Body, Controller, Post, Get, Patch, Delete, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Body() createUserDto: any) {
        return this.usersService.create(createUserDto);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@Req() req: any) {
        return this.usersService.findById(req.user.userId);
    }

    @Patch('profile')
    @UseGuards(JwtAuthGuard)
    async updateProfile(@Req() req: any, @Body() body: { name?: string }) {
        return this.usersService.updateProfile(req.user.userId, { name: body.name });
    }

    @Post('change-password')
    @UseGuards(JwtAuthGuard)
    async changePassword(@Req() req: any, @Body() body: { currentPassword: string; newPassword: string }) {
        if (!body.currentPassword || !body.newPassword) {
            throw new BadRequestException('Both current and new password are required');
        }
        if (body.newPassword.length < 6) {
            throw new BadRequestException('New password must be at least 6 characters');
        }
        return this.usersService.changePassword(req.user.userId, body.currentPassword, body.newPassword);
    }

    @Delete('account')
    @UseGuards(JwtAuthGuard)
    async deleteAccount(@Req() req: any) {
        return this.usersService.deleteAccount(req.user.userId);
    }
}
