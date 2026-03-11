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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const admin_service_1 = require("../admin/admin.service");
const config_1 = require("@nestjs/config");
let AuthController = class AuthController {
    constructor(authService, configService, adminService) {
        this.authService = authService;
        this.configService = configService;
        this.adminService = adminService;
    }
    async getSettings() {
        return this.adminService.getAuthSettings();
    }
    async signup(body, response) {
        const user = await this.authService.signup(body.email, body.password, body.name);
        if (!user) {
            throw new common_1.UnauthorizedException('User creation failed');
        }
        const { access_token } = await this.authService.login(user);
        const domain = this.configService.get('COOKIE_DOMAIN') || 'localhost';
        response.cookie('Authentication', access_token, {
            httpOnly: true,
            domain: domain === 'localhost' ? undefined : domain,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        });
        return { message: 'Account created and logged in successfully' };
    }
    async login(body, response) {
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        const { access_token } = await this.authService.login(user);
        const domain = this.configService.get('COOKIE_DOMAIN') || 'localhost';
        console.log(domain);
        response.cookie('Authentication', access_token, {
            httpOnly: true,
            domain: domain === 'localhost' ? undefined : domain,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        });
        return { message: 'Logged in successfully' };
    }
    async googleLogin(token, response) {
        const authResult = await this.authService.googleLogin(token);
        if (!authResult) {
            throw new common_1.UnauthorizedException('Google authentication failed');
        }
        const { access_token } = authResult;
        const domain = this.configService.get('COOKIE_DOMAIN') || 'localhost';
        response.cookie('Authentication', access_token, {
            httpOnly: true,
            domain: domain === 'localhost' ? undefined : domain,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        });
        return { message: 'Logged in successfully' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('settings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getSettings", null);
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('google'),
    __param(0, (0, common_1.Body)('token')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleLogin", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        config_1.ConfigService,
        admin_service_1.AdminService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map