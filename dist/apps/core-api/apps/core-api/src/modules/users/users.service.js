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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../../../../../libs/database/src");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const schema = require("../../../../../libs/database/src");
const drizzle_orm_1 = require("drizzle-orm");
const bcrypt = require("bcryptjs");
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
    async findById(id) {
        const result = await this.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema.users.id, id)
        });
        if (result) {
            const { password } = result, user = __rest(result, ["password"]);
            return user;
        }
        return null;
    }
    async create(data) {
        const [user] = await this.db.insert(schema.users).values(data).returning();
        return user;
    }
    async upsertGoogleUser(googleId, email, name) {
        const existing = await this.findOne(email);
        if (existing) {
            if (!existing.googleId) {
                const [updated] = await this.db.update(schema.users)
                    .set({ googleId, name: existing.name || name })
                    .where((0, drizzle_orm_1.eq)(schema.users.id, existing.id))
                    .returning();
                return updated;
            }
            return existing;
        }
        const [user] = await this.db.insert(schema.users).values({
            email,
            googleId,
            name,
            password: '',
        }).returning();
        return user;
    }
    async updateProfile(id, data) {
        const [updated] = await this.db.update(schema.users)
            .set(data)
            .where((0, drizzle_orm_1.eq)(schema.users.id, id))
            .returning();
        if (updated) {
            const { password } = updated, user = __rest(updated, ["password"]);
            return user;
        }
        return null;
    }
    async changePassword(id, currentPassword, newPassword) {
        const user = await this.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema.users.id, id),
        });
        if (!user)
            throw new common_1.BadRequestException('User not found');
        if (!user.password || user.password === '') {
            throw new common_1.BadRequestException('Cannot change password for OAuth accounts. Use your provider to manage credentials.');
        }
        const valid = await bcrypt.compare(currentPassword, user.password);
        if (!valid)
            throw new common_1.BadRequestException('Current password is incorrect');
        const hashed = await bcrypt.hash(newPassword, 10);
        await this.db.update(schema.users)
            .set({ password: hashed })
            .where((0, drizzle_orm_1.eq)(schema.users.id, id));
        return { message: 'Password updated successfully' };
    }
    async deleteAccount(id) {
        await this.db.delete(schema.sessions).where((0, drizzle_orm_1.eq)(schema.sessions.userId, id));
        await this.db.delete(schema.users).where((0, drizzle_orm_1.eq)(schema.users.id, id));
        return { message: 'Account deleted successfully' };
    }
    async createFromClerk(clerkId, email) {
        const existing = await this.findOne(email);
        if (existing) {
            if (!existing.clerkId) {
                await this.db.update(schema.users).set({ clerkId }).where((0, drizzle_orm_1.eq)(schema.users.id, existing.id));
            }
            return existing;
        }
        const [user] = await this.db.insert(schema.users).values({
            email,
            clerkId,
            password: '',
        }).returning();
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_1.DRIZZLE_DB)),
    __metadata("design:paramtypes", [node_postgres_1.NodePgDatabase])
], UsersService);
//# sourceMappingURL=users.service.js.map