import { Controller, Post, Body, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private configService: ConfigService,
    ) { }

    @Post('signup')
    async signup(@Body() body: any, @Res({ passthrough: true }) response: Response) {
        const user = await this.authService.signup(body.email, body.password);
        if (!user) {
            throw new UnauthorizedException('User creation failed');
        }

        const { access_token } = await this.authService.login(user);

        // Configure cookie for cross-subdomain access
        const domain = this.configService.get<string>('COOKIE_DOMAIN') || 'localhost';

        response.cookie('Authentication', access_token, {
            httpOnly: true,
            domain: domain === 'localhost' ? undefined : domain,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        });

        return { message: 'Account created and logged in successfully' };
    }

    @Post('login')
    async login(@Body() body: any, @Res({ passthrough: true }) response: Response) {
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            throw new UnauthorizedException();
        }
        const { access_token } = await this.authService.login(user);

        // Configure cookie for cross-subdomain access
        const domain = this.configService.get<string>('COOKIE_DOMAIN') || 'localhost';

        response.cookie('Authentication', access_token, {
            httpOnly: true,
            domain: domain === 'localhost' ? undefined : domain,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        });

        return { message: 'Logged in successfully' };
    }
}
