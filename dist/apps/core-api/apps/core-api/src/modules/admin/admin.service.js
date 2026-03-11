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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../../../../../libs/database/src");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const schema = require("../../../../../libs/database/src");
const drizzle_orm_1 = require("drizzle-orm");
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
    async getAuthSettings() {
        const settings = await this.db.select().from(schema.appSettings).limit(1);
        if (settings.length === 0) {
            return { authType: 'clerk' };
        }
        return settings[0];
    }
    async updateAuthSettings(authType) {
        let settings = await this.getAuthSettings();
        const existing = await this.db.select().from(schema.appSettings).limit(1);
        if (existing.length === 0) {
            const [newSettings] = await this.db.insert(schema.appSettings).values({ authType }).returning();
            return newSettings;
        }
        const [updated] = await this.db.update(schema.appSettings)
            .set({ authType })
            .where((0, drizzle_orm_1.eq)(schema.appSettings.id, existing[0].id))
            .returning();
        return updated;
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_1.DRIZZLE_DB)),
    __metadata("design:paramtypes", [node_postgres_1.NodePgDatabase])
], AdminService);
//# sourceMappingURL=admin.service.js.map