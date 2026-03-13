"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const google_auth_library_1 = require("google-auth-library");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcryptjs");
const database_1 = require("../../../../../libs/database/src");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const schema = require("../../../../../libs/database/src");
const drizzle_orm_1 = require("drizzle-orm");
let AuthService = class AuthService {
    constructor(usersService, jwtService, configService, db) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.db = db;
        this.googleClient = new google_auth_library_1.OAuth2Client(this.configService.get('GOOGLE_CLIENT_ID'));
    }
    async verifyGoogleToken(token) {
        try {
            const ticket = await this.googleClient.verifyIdToken({
                idToken: token,
                audience: this.configService.get('GOOGLE_CLIENT_ID'),
            });
            return ticket.getPayload();
        }
        catch (error) {
            return null;
        }
    }
    async googleLogin(idToken) {
        const payload = await this.verifyGoogleToken(idToken);
        if (!payload)
            return null;
        const { sub: googleId, email, name } = payload;
        if (!email)
            return null;
        const user = await this.usersService.upsertGoogleUser(googleId, email, name || '');
        const jwtPayload = { username: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(jwtPayload),
        };
    }
    async validateUser(email, pass) {
        const user = await this.usersService.findOne(email);
        if (!user || !user.password) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(pass, user.password);
        if (isPasswordValid) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async signup(email, pass, name) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(pass, saltRounds);
        return await this.usersService.create({ email, password: hashedPassword, name });
    }
    async login(user) {
        if (user.id) {
            await this.db.update(schema.users)
                .set({ lastActiveAt: new Date() })
                .where((0, drizzle_orm_1.eq)(schema.users.id, user.id))
                .catch(() => { });
        }
        const payload = { username: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)(database_1.DRIZZLE_DB)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService,
        node_postgres_1.NodePgDatabase])
], AuthService);
//# sourceMappingURL=auth.service.js.map