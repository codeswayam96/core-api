import { Injectable, Inject } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { DRIZZLE_DB } from '@core/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@core/database';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
    private googleClient: OAuth2Client;

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        @Inject(DRIZZLE_DB) private db: NodePgDatabase<typeof schema>,
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
        if (!user || !user.password) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(pass, user.password);
        if (isPasswordValid) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async signup(email: string, pass: string, name?: string): Promise<any> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(pass, saltRounds);
        return await this.usersService.create({ email, password: hashedPassword, name });
    }

    async login(user: any) {
        // Update lastActiveAt on login
        if (user.id) {
            await this.db.update(schema.users)
                .set({ lastActiveAt: new Date() })
                .where(eq(schema.users.id, user.id))
                .catch(() => { /* non-critical */ });
        }
        const payload = { username: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
