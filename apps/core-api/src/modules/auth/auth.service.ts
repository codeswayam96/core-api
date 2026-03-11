import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private googleClient: OAuth2Client;

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {
        this.googleClient = new OAuth2Client(this.configService.get('GOOGLE_CLIENT_ID'));
    }

    async verifyGoogleToken(token: string) {
        try {
            const ticket = await this.googleClient.verifyIdToken({
                idToken: token,
                audience: this.configService.get('GOOGLE_CLIENT_ID'),
            });
            return ticket.getPayload();
        } catch (error) {
            return null;
        }
    }

    async googleLogin(idToken: string) {
        const payload = await this.verifyGoogleToken(idToken);
        if (!payload) return null;

        const { sub: googleId, email, name } = payload;
        if (!email) return null;

        const user = await this.usersService.upsertGoogleUser(googleId, email, name || '');
        const jwtPayload = { username: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(jwtPayload),
        };
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async signup(email: string, pass: string, name?: string): Promise<any> {
        return await this.usersService.create({ email, password: pass, name });
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
