/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/core-api/src/app.controller.ts"
/*!*********************************************!*\
  !*** ./apps/core-api/src/app.controller.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/core-api/src/app.service.ts");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ },

/***/ "./apps/core-api/src/app.module.ts"
/*!*****************************************!*\
  !*** ./apps/core-api/src/app.module.ts ***!
  \*****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const bullmq_1 = __webpack_require__(/*! @nestjs/bullmq */ "@nestjs/bullmq");
const shared_module_1 = __webpack_require__(/*! ./shared/shared.module */ "./apps/core-api/src/shared/shared.module.ts");
const auth_module_1 = __webpack_require__(/*! ./modules/auth/auth.module */ "./apps/core-api/src/modules/auth/auth.module.ts");
const users_module_1 = __webpack_require__(/*! ./modules/users/users.module */ "./apps/core-api/src/modules/users/users.module.ts");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./apps/core-api/src/app.controller.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/core-api/src/app.service.ts");
const admin_module_1 = __webpack_require__(/*! ./modules/admin/admin.module */ "./apps/core-api/src/modules/admin/admin.module.ts");
const blogs_module_1 = __webpack_require__(/*! ./modules/blogs/blogs.module */ "./apps/core-api/src/modules/blogs/blogs.module.ts");
const saas_products_module_1 = __webpack_require__(/*! ./modules/saas-products/saas-products.module */ "./apps/core-api/src/modules/saas-products/saas-products.module.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            bullmq_1.BullModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    connection: {
                        host: configService.get('REDIS_HOST') || 'localhost',
                        port: parseInt(configService.get('REDIS_PORT') || '6379'),
                        password: configService.get('REDIS_PASSWORD'),
                        tls: configService.get('REDIS_TLS') === 'true' ? {} : undefined,
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            shared_module_1.SharedModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            admin_module_1.AdminModule,
            blogs_module_1.BlogsModule,
            saas_products_module_1.SaasProductsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ },

/***/ "./apps/core-api/src/app.service.ts"
/*!******************************************!*\
  !*** ./apps/core-api/src/app.service.ts ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ },

/***/ "./apps/core-api/src/modules/admin/admin.controller.ts"
/*!*************************************************************!*\
  !*** ./apps/core-api/src/modules/admin/admin.controller.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const admin_service_1 = __webpack_require__(/*! ./admin.service */ "./apps/core-api/src/modules/admin/admin.service.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/jwt-auth.guard */ "./apps/core-api/src/modules/auth/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__(/*! ../../shared/guards/roles.guard */ "./apps/core-api/src/shared/guards/roles.guard.ts");
const roles_decorator_1 = __webpack_require__(/*! ../../shared/decorators/roles.decorator */ "./apps/core-api/src/shared/decorators/roles.decorator.ts");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async listUsers() {
        return this.adminService.listUsers();
    }
    async updateUserRole(id, role) {
        return this.adminService.updateUserRole(id, role);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('users'),
    (0, roles_decorator_1.Roles)('admin', 'superadmin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listUsers", null);
__decorate([
    (0, common_1.Patch)('users/:id/role'),
    (0, roles_decorator_1.Roles)('superadmin'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateUserRole", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof admin_service_1.AdminService !== "undefined" && admin_service_1.AdminService) === "function" ? _a : Object])
], AdminController);


/***/ },

/***/ "./apps/core-api/src/modules/admin/admin.module.ts"
/*!*********************************************************!*\
  !*** ./apps/core-api/src/modules/admin/admin.module.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const admin_controller_1 = __webpack_require__(/*! ./admin.controller */ "./apps/core-api/src/modules/admin/admin.controller.ts");
const admin_service_1 = __webpack_require__(/*! ./admin.service */ "./apps/core-api/src/modules/admin/admin.service.ts");
const shared_module_1 = __webpack_require__(/*! ../../shared/shared.module */ "./apps/core-api/src/shared/shared.module.ts");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [shared_module_1.SharedModule],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService]
    })
], AdminModule);


/***/ },

/***/ "./apps/core-api/src/modules/admin/admin.service.ts"
/*!**********************************************************!*\
  !*** ./apps/core-api/src/modules/admin/admin.service.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const database_1 = __webpack_require__(/*! @shared/database */ "./libs/database/src/index.ts");
const node_postgres_1 = __webpack_require__(/*! drizzle-orm/node-postgres */ "drizzle-orm/node-postgres");
const schema = __webpack_require__(/*! @shared/database */ "./libs/database/src/index.ts");
const drizzle_orm_1 = __webpack_require__(/*! drizzle-orm */ "drizzle-orm");
let AdminService = class AdminService {
    constructor(db) {
        this.db = db;
    }
    async listUsers() {
        const result = await this.db.select({
            id: schema.users.id,
            email: schema.users.email,
            role: schema.users.role,
            createdAt: schema.users.createdAt,
        }).from(schema.users);
        return result;
    }
    async updateUserRole(id, role) {
        const [user] = await this.db.update(schema.users)
            .set({ role })
            .where((0, drizzle_orm_1.eq)(schema.users.id, id))
            .returning({ id: schema.users.id, email: schema.users.email, role: schema.users.role });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_1.DRIZZLE_DB)),
    __metadata("design:paramtypes", [typeof (_a = typeof node_postgres_1.NodePgDatabase !== "undefined" && node_postgres_1.NodePgDatabase) === "function" ? _a : Object])
], AdminService);


/***/ },

/***/ "./apps/core-api/src/modules/auth/auth.controller.ts"
/*!***********************************************************!*\
  !*** ./apps/core-api/src/modules/auth/auth.controller.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./apps/core-api/src/modules/auth/auth.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const express_1 = __webpack_require__(/*! express */ "express");
let AuthController = class AuthController {
    constructor(authService, configService) {
        this.authService = authService;
        this.configService = configService;
    }
    async signup(body, response) {
        const user = await this.authService.signup(body.email, body.password);
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
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], AuthController);


/***/ },

/***/ "./apps/core-api/src/modules/auth/auth.module.ts"
/*!*******************************************************!*\
  !*** ./apps/core-api/src/modules/auth/auth.module.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./apps/core-api/src/modules/auth/auth.service.ts");
const users_module_1 = __webpack_require__(/*! ../users/users.module */ "./apps/core-api/src/modules/users/users.module.ts");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const jwt_strategy_1 = __webpack_require__(/*! ./jwt.strategy */ "./apps/core-api/src/modules/auth/jwt.strategy.ts");
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./apps/core-api/src/modules/auth/auth.controller.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '60m' },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ },

/***/ "./apps/core-api/src/modules/auth/auth.service.ts"
/*!********************************************************!*\
  !*** ./apps/core-api/src/modules/auth/auth.service.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_service_1 = __webpack_require__(/*! ../users/users.service */ "./apps/core-api/src/modules/users/users.service.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, pass) {
        const user = await this.usersService.findOne(email);
        if (user && user.password === pass) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async signup(email, pass) {
        return await this.usersService.create({ email, password: pass });
    }
    async login(user) {
        const payload = { username: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);


/***/ },

/***/ "./apps/core-api/src/modules/auth/jwt-auth.guard.ts"
/*!**********************************************************!*\
  !*** ./apps/core-api/src/modules/auth/jwt-auth.guard.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ },

/***/ "./apps/core-api/src/modules/auth/jwt.strategy.ts"
/*!********************************************************!*\
  !*** ./apps/core-api/src/modules/auth/jwt.strategy.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    var _a;
                    return (_a = request === null || request === void 0 ? void 0 : request.cookies) === null || _a === void 0 ? void 0 : _a.Authentication;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }
    async validate(payload) {
        return { userId: payload.sub, username: payload.username, role: payload.role };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], JwtStrategy);


/***/ },

/***/ "./apps/core-api/src/modules/blogs/blogs.controller.ts"
/*!*************************************************************!*\
  !*** ./apps/core-api/src/modules/blogs/blogs.controller.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlogsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const blogs_service_1 = __webpack_require__(/*! ./blogs.service */ "./apps/core-api/src/modules/blogs/blogs.service.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/jwt-auth.guard */ "./apps/core-api/src/modules/auth/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__(/*! ../../shared/guards/roles.guard */ "./apps/core-api/src/shared/guards/roles.guard.ts");
const roles_decorator_1 = __webpack_require__(/*! ../../shared/decorators/roles.decorator */ "./apps/core-api/src/shared/decorators/roles.decorator.ts");
let BlogsController = class BlogsController {
    constructor(blogsService) {
        this.blogsService = blogsService;
    }
    findAll() {
        return this.blogsService.findAll();
    }
    findOne(id) {
        return this.blogsService.findOne(id);
    }
    create(req, createBlogDto) {
        return this.blogsService.create(Object.assign(Object.assign({}, createBlogDto), { authorId: req.user.userId }));
    }
    update(id, updateBlogDto) {
        return this.blogsService.update(id, updateBlogDto);
    }
    remove(id) {
        return this.blogsService.remove(id);
    }
};
exports.BlogsController = BlogsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlogsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BlogsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'superadmin'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BlogsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'superadmin'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], BlogsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'superadmin'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BlogsController.prototype, "remove", null);
exports.BlogsController = BlogsController = __decorate([
    (0, common_1.Controller)('blogs'),
    __metadata("design:paramtypes", [typeof (_a = typeof blogs_service_1.BlogsService !== "undefined" && blogs_service_1.BlogsService) === "function" ? _a : Object])
], BlogsController);


/***/ },

/***/ "./apps/core-api/src/modules/blogs/blogs.module.ts"
/*!*********************************************************!*\
  !*** ./apps/core-api/src/modules/blogs/blogs.module.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlogsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const blogs_controller_1 = __webpack_require__(/*! ./blogs.controller */ "./apps/core-api/src/modules/blogs/blogs.controller.ts");
const blogs_service_1 = __webpack_require__(/*! ./blogs.service */ "./apps/core-api/src/modules/blogs/blogs.service.ts");
const shared_module_1 = __webpack_require__(/*! ../../shared/shared.module */ "./apps/core-api/src/shared/shared.module.ts");
let BlogsModule = class BlogsModule {
};
exports.BlogsModule = BlogsModule;
exports.BlogsModule = BlogsModule = __decorate([
    (0, common_1.Module)({
        imports: [shared_module_1.SharedModule],
        controllers: [blogs_controller_1.BlogsController],
        providers: [blogs_service_1.BlogsService]
    })
], BlogsModule);


/***/ },

/***/ "./apps/core-api/src/modules/blogs/blogs.service.ts"
/*!**********************************************************!*\
  !*** ./apps/core-api/src/modules/blogs/blogs.service.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlogsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const database_1 = __webpack_require__(/*! @shared/database */ "./libs/database/src/index.ts");
const node_postgres_1 = __webpack_require__(/*! drizzle-orm/node-postgres */ "drizzle-orm/node-postgres");
const schema = __webpack_require__(/*! @shared/database */ "./libs/database/src/index.ts");
const drizzle_orm_1 = __webpack_require__(/*! drizzle-orm */ "drizzle-orm");
let BlogsService = class BlogsService {
    constructor(db) {
        this.db = db;
    }
    async findAll() {
        return this.db.select().from(schema.blogs);
    }
    async findOne(id) {
        const result = await this.db.query.blogs.findFirst({
            where: (0, drizzle_orm_1.eq)(schema.blogs.id, id),
            with: { author: { columns: { id: true, email: true, role: true } } }
        });
        if (!result)
            throw new common_1.NotFoundException('Blog not found');
        return result;
    }
    async create(data) {
        const [blog] = await this.db.insert(schema.blogs).values(data).returning();
        return blog;
    }
    async update(id, data) {
        const [blog] = await this.db.update(schema.blogs)
            .set(Object.assign(Object.assign({}, data), { updatedAt: new Date() }))
            .where((0, drizzle_orm_1.eq)(schema.blogs.id, id))
            .returning();
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        return blog;
    }
    async remove(id) {
        const [blog] = await this.db.delete(schema.blogs).where((0, drizzle_orm_1.eq)(schema.blogs.id, id)).returning();
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        return blog;
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_1.DRIZZLE_DB)),
    __metadata("design:paramtypes", [typeof (_a = typeof node_postgres_1.NodePgDatabase !== "undefined" && node_postgres_1.NodePgDatabase) === "function" ? _a : Object])
], BlogsService);


/***/ },

/***/ "./apps/core-api/src/modules/saas-products/saas-products.controller.ts"
/*!*****************************************************************************!*\
  !*** ./apps/core-api/src/modules/saas-products/saas-products.controller.ts ***!
  \*****************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SaasProductsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const saas_products_service_1 = __webpack_require__(/*! ./saas-products.service */ "./apps/core-api/src/modules/saas-products/saas-products.service.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/jwt-auth.guard */ "./apps/core-api/src/modules/auth/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__(/*! ../../shared/guards/roles.guard */ "./apps/core-api/src/shared/guards/roles.guard.ts");
const roles_decorator_1 = __webpack_require__(/*! ../../shared/decorators/roles.decorator */ "./apps/core-api/src/shared/decorators/roles.decorator.ts");
let SaasProductsController = class SaasProductsController {
    constructor(saasProductsService) {
        this.saasProductsService = saasProductsService;
    }
    findAll() {
        return this.saasProductsService.findAll();
    }
    findOne(id) {
        return this.saasProductsService.findOne(id);
    }
    create(createSaasProductDto) {
        return this.saasProductsService.create(createSaasProductDto);
    }
    update(id, updateSaasProductDto) {
        return this.saasProductsService.update(id, updateSaasProductDto);
    }
    remove(id) {
        return this.saasProductsService.remove(id);
    }
};
exports.SaasProductsController = SaasProductsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SaasProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SaasProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'superadmin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SaasProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'superadmin'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], SaasProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'superadmin'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SaasProductsController.prototype, "remove", null);
exports.SaasProductsController = SaasProductsController = __decorate([
    (0, common_1.Controller)('saas-products'),
    __metadata("design:paramtypes", [typeof (_a = typeof saas_products_service_1.SaasProductsService !== "undefined" && saas_products_service_1.SaasProductsService) === "function" ? _a : Object])
], SaasProductsController);


/***/ },

/***/ "./apps/core-api/src/modules/saas-products/saas-products.module.ts"
/*!*************************************************************************!*\
  !*** ./apps/core-api/src/modules/saas-products/saas-products.module.ts ***!
  \*************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SaasProductsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const saas_products_controller_1 = __webpack_require__(/*! ./saas-products.controller */ "./apps/core-api/src/modules/saas-products/saas-products.controller.ts");
const saas_products_service_1 = __webpack_require__(/*! ./saas-products.service */ "./apps/core-api/src/modules/saas-products/saas-products.service.ts");
const shared_module_1 = __webpack_require__(/*! ../../shared/shared.module */ "./apps/core-api/src/shared/shared.module.ts");
let SaasProductsModule = class SaasProductsModule {
};
exports.SaasProductsModule = SaasProductsModule;
exports.SaasProductsModule = SaasProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [shared_module_1.SharedModule],
        controllers: [saas_products_controller_1.SaasProductsController],
        providers: [saas_products_service_1.SaasProductsService]
    })
], SaasProductsModule);


/***/ },

/***/ "./apps/core-api/src/modules/saas-products/saas-products.service.ts"
/*!**************************************************************************!*\
  !*** ./apps/core-api/src/modules/saas-products/saas-products.service.ts ***!
  \**************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SaasProductsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const database_1 = __webpack_require__(/*! @shared/database */ "./libs/database/src/index.ts");
const node_postgres_1 = __webpack_require__(/*! drizzle-orm/node-postgres */ "drizzle-orm/node-postgres");
const schema = __webpack_require__(/*! @shared/database */ "./libs/database/src/index.ts");
const drizzle_orm_1 = __webpack_require__(/*! drizzle-orm */ "drizzle-orm");
let SaasProductsService = class SaasProductsService {
    constructor(db) {
        this.db = db;
    }
    async findAll() {
        return this.db.select().from(schema.saasProducts);
    }
    async findOne(id) {
        const result = await this.db.query.saasProducts.findFirst({
            where: (0, drizzle_orm_1.eq)(schema.saasProducts.id, id),
        });
        if (!result)
            throw new common_1.NotFoundException('SaaS Product not found');
        return result;
    }
    async create(data) {
        const [product] = await this.db.insert(schema.saasProducts).values(data).returning();
        return product;
    }
    async update(id, data) {
        const [product] = await this.db.update(schema.saasProducts)
            .set(Object.assign(Object.assign({}, data), { updatedAt: new Date() }))
            .where((0, drizzle_orm_1.eq)(schema.saasProducts.id, id))
            .returning();
        if (!product)
            throw new common_1.NotFoundException('SaaS Product not found');
        return product;
    }
    async remove(id) {
        const [product] = await this.db.delete(schema.saasProducts).where((0, drizzle_orm_1.eq)(schema.saasProducts.id, id)).returning();
        if (!product)
            throw new common_1.NotFoundException('SaaS Product not found');
        return product;
    }
};
exports.SaasProductsService = SaasProductsService;
exports.SaasProductsService = SaasProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_1.DRIZZLE_DB)),
    __metadata("design:paramtypes", [typeof (_a = typeof node_postgres_1.NodePgDatabase !== "undefined" && node_postgres_1.NodePgDatabase) === "function" ? _a : Object])
], SaasProductsService);


/***/ },

/***/ "./apps/core-api/src/modules/users/users.controller.ts"
/*!*************************************************************!*\
  !*** ./apps/core-api/src/modules/users/users.controller.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./apps/core-api/src/modules/users/users.service.ts");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ },

/***/ "./apps/core-api/src/modules/users/users.module.ts"
/*!*********************************************************!*\
  !*** ./apps/core-api/src/modules/users/users.module.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./apps/core-api/src/modules/users/users.service.ts");
const shared_module_1 = __webpack_require__(/*! ../../shared/shared.module */ "./apps/core-api/src/shared/shared.module.ts");
const users_controller_1 = __webpack_require__(/*! ./users.controller */ "./apps/core-api/src/modules/users/users.controller.ts");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [shared_module_1.SharedModule],
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService],
        controllers: [users_controller_1.UsersController],
    })
], UsersModule);


/***/ },

/***/ "./apps/core-api/src/modules/users/users.service.ts"
/*!**********************************************************!*\
  !*** ./apps/core-api/src/modules/users/users.service.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const database_1 = __webpack_require__(/*! @shared/database */ "./libs/database/src/index.ts");
const node_postgres_1 = __webpack_require__(/*! drizzle-orm/node-postgres */ "drizzle-orm/node-postgres");
const schema = __webpack_require__(/*! @shared/database */ "./libs/database/src/index.ts");
const drizzle_orm_1 = __webpack_require__(/*! drizzle-orm */ "drizzle-orm");
let UsersService = class UsersService {
    constructor(db) {
        this.db = db;
    }
    async findOne(email) {
        const result = await this.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema.users.email, email),
        });
        return result || null;
    }
    async create(data) {
        const [user] = await this.db.insert(schema.users).values(data).returning();
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_1.DRIZZLE_DB)),
    __metadata("design:paramtypes", [typeof (_a = typeof node_postgres_1.NodePgDatabase !== "undefined" && node_postgres_1.NodePgDatabase) === "function" ? _a : Object])
], UsersService);


/***/ },

/***/ "./apps/core-api/src/shared/decorators/roles.decorator.ts"
/*!****************************************************************!*\
  !*** ./apps/core-api/src/shared/decorators/roles.decorator.ts ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ },

/***/ "./apps/core-api/src/shared/guards/roles.guard.ts"
/*!********************************************************!*\
  !*** ./apps/core-api/src/shared/guards/roles.guard.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const roles_decorator_1 = __webpack_require__(/*! ../decorators/roles.decorator */ "./apps/core-api/src/shared/decorators/roles.decorator.ts");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => (user === null || user === void 0 ? void 0 : user.role) === role);
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ },

/***/ "./apps/core-api/src/shared/shared.module.ts"
/*!***************************************************!*\
  !*** ./apps/core-api/src/shared/shared.module.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const database_1 = __webpack_require__(/*! @shared/database */ "./libs/database/src/index.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let SharedModule = class SharedModule {
};
exports.SharedModule = SharedModule;
exports.SharedModule = SharedModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, database_1.DrizzleModule],
        exports: [database_1.DrizzleModule],
    })
], SharedModule);


/***/ },

/***/ "./libs/database/src/database.module.ts"
/*!**********************************************!*\
  !*** ./libs/database/src/database.module.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DrizzleModule = exports.DRIZZLE_DB = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const node_postgres_1 = __webpack_require__(/*! drizzle-orm/node-postgres */ "drizzle-orm/node-postgres");
const pg_1 = __webpack_require__(/*! pg */ "pg");
const schema = __webpack_require__(/*! ./schema */ "./libs/database/src/schema.ts");
exports.DRIZZLE_DB = 'DRIZZLE_DB_CONNECTION';
let DrizzleModule = class DrizzleModule {
};
exports.DrizzleModule = DrizzleModule;
exports.DrizzleModule = DrizzleModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            {
                provide: exports.DRIZZLE_DB,
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    const connectionString = configService.get('DATABASE_URL');
                    const pool = new pg_1.Pool({
                        connectionString,
                    });
                    return (0, node_postgres_1.drizzle)(pool, { schema });
                },
            },
        ],
        exports: [exports.DRIZZLE_DB],
    })
], DrizzleModule);


/***/ },

/***/ "./libs/database/src/index.ts"
/*!************************************!*\
  !*** ./libs/database/src/index.ts ***!
  \************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./schema */ "./libs/database/src/schema.ts"), exports);
__exportStar(__webpack_require__(/*! ./database.module */ "./libs/database/src/database.module.ts"), exports);


/***/ },

/***/ "./libs/database/src/schema.ts"
/*!*************************************!*\
  !*** ./libs/database/src/schema.ts ***!
  \*************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.blogsRelations = exports.autoRepliesRelations = exports.trackingLogsRelations = exports.sessionsRelations = exports.usersRelations = exports.saasProducts = exports.blogs = exports.autoReplies = exports.trackingLogs = exports.sessions = exports.users = exports.roleEnum = exports.instadmSchema = exports.mailtrackerSchema = void 0;
const pg_core_1 = __webpack_require__(/*! drizzle-orm/pg-core */ "drizzle-orm/pg-core");
const drizzle_orm_1 = __webpack_require__(/*! drizzle-orm */ "drizzle-orm");
exports.mailtrackerSchema = (0, pg_core_1.pgSchema)('mailtracker');
exports.instadmSchema = (0, pg_core_1.pgSchema)('instadm');
exports.roleEnum = (0, pg_core_1.pgEnum)('role', ['user', 'admin', 'superadmin']);
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    email: (0, pg_core_1.text)('email').unique().notNull(),
    password: (0, pg_core_1.text)('password').notNull(),
    role: (0, exports.roleEnum)('role').default('user').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
exports.sessions = (0, pg_core_1.pgTable)('sessions', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    token: (0, pg_core_1.text)('token').unique().notNull(),
    userId: (0, pg_core_1.integer)('user_id').notNull().references(() => exports.users.id),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
exports.trackingLogs = exports.mailtrackerSchema.table('tracking_logs', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    action: (0, pg_core_1.text)('action').notNull(),
    userId: (0, pg_core_1.integer)('user_id').notNull().references(() => exports.users.id),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
exports.autoReplies = exports.instadmSchema.table('auto_replies', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    message: (0, pg_core_1.text)('message').notNull(),
    userId: (0, pg_core_1.integer)('user_id').notNull().references(() => exports.users.id),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
exports.blogs = (0, pg_core_1.pgTable)('blogs', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    saas: (0, pg_core_1.text)('saas').notNull(),
    tag: (0, pg_core_1.text)('tag').notNull(),
    title: (0, pg_core_1.text)('title').notNull(),
    slug: (0, pg_core_1.text)('slug').notNull(),
    excerpt: (0, pg_core_1.text)('excerpt').notNull(),
    content: (0, pg_core_1.text)('content').notNull(),
    featured: (0, pg_core_1.text)('featured').notNull().default('false'),
    authorId: (0, pg_core_1.integer)('author_id').notNull().references(() => exports.users.id),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
exports.saasProducts = (0, pg_core_1.pgTable)('saas_products', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    saasId: (0, pg_core_1.text)('saas_id').notNull().unique(),
    icon: (0, pg_core_1.text)('icon'),
    name: (0, pg_core_1.text)('name').notNull(),
    tag: (0, pg_core_1.text)('tag').notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
    domain: (0, pg_core_1.text)('domain').notNull(),
    status: (0, pg_core_1.text)('status').notNull(),
    featured: (0, pg_core_1.text)('featured').notNull().default('false'),
    price: (0, pg_core_1.integer)('price').notNull().default(0),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many }) => ({
    sessions: many(exports.sessions),
    trackingLogs: many(exports.trackingLogs),
    autoReplies: many(exports.autoReplies),
    blogs: many(exports.blogs),
}));
exports.sessionsRelations = (0, drizzle_orm_1.relations)(exports.sessions, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.sessions.userId],
        references: [exports.users.id],
    }),
}));
exports.trackingLogsRelations = (0, drizzle_orm_1.relations)(exports.trackingLogs, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.trackingLogs.userId],
        references: [exports.users.id],
    }),
}));
exports.autoRepliesRelations = (0, drizzle_orm_1.relations)(exports.autoReplies, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.autoReplies.userId],
        references: [exports.users.id],
    }),
}));
exports.blogsRelations = (0, drizzle_orm_1.relations)(exports.blogs, ({ one }) => ({
    author: one(exports.users, {
        fields: [exports.blogs.authorId],
        references: [exports.users.id],
    }),
}));


/***/ },

/***/ "@nestjs/bullmq"
/*!*********************************!*\
  !*** external "@nestjs/bullmq" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/bullmq");

/***/ },

/***/ "@nestjs/common"
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/common");

/***/ },

/***/ "@nestjs/config"
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/config");

/***/ },

/***/ "@nestjs/core"
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
(module) {

module.exports = require("@nestjs/core");

/***/ },

/***/ "@nestjs/jwt"
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
(module) {

module.exports = require("@nestjs/jwt");

/***/ },

/***/ "@nestjs/passport"
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
(module) {

module.exports = require("@nestjs/passport");

/***/ },

/***/ "cookie-parser"
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
(module) {

module.exports = require("cookie-parser");

/***/ },

/***/ "drizzle-orm"
/*!******************************!*\
  !*** external "drizzle-orm" ***!
  \******************************/
(module) {

module.exports = require("drizzle-orm");

/***/ },

/***/ "drizzle-orm/node-postgres"
/*!********************************************!*\
  !*** external "drizzle-orm/node-postgres" ***!
  \********************************************/
(module) {

module.exports = require("drizzle-orm/node-postgres");

/***/ },

/***/ "drizzle-orm/pg-core"
/*!**************************************!*\
  !*** external "drizzle-orm/pg-core" ***!
  \**************************************/
(module) {

module.exports = require("drizzle-orm/pg-core");

/***/ },

/***/ "express"
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
(module) {

module.exports = require("express");

/***/ },

/***/ "passport-jwt"
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
(module) {

module.exports = require("passport-jwt");

/***/ },

/***/ "pg"
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
(module) {

module.exports = require("pg");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!***********************************!*\
  !*** ./apps/core-api/src/main.ts ***!
  \***********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/core-api/src/app.module.ts");
const cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'https://app.codeswayam.com',
            'https://account.codeswayam.com',
            'https://mailtracker.codeswayam.com',
            'https://auraflow.codeswayam.com'
        ],
        credentials: true,
    });
    await app.listen(3000);
}
bootstrap();

})();

/******/ })()
;