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
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../../../../../libs/database/src");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const schema = require("../../../../../libs/database/src");
const drizzle_orm_1 = require("drizzle-orm");
let BlogsService = class BlogsService {
    constructor(db) {
        this.db = db;
    }
    async findAll() {
        const rows = await this.db
            .select({
            id: schema.blogs.id,
            saas: schema.blogs.saas,
            tag: schema.blogs.tag,
            title: schema.blogs.title,
            slug: schema.blogs.slug,
            excerpt: schema.blogs.excerpt,
            featured: schema.blogs.featured,
            status: schema.blogs.status,
            views: schema.blogs.views,
            category: schema.blogs.category,
            authorId: schema.blogs.authorId,
            authorName: schema.users.name,
            authorEmail: schema.users.email,
            createdAt: schema.blogs.createdAt,
            updatedAt: schema.blogs.updatedAt,
        })
            .from(schema.blogs)
            .leftJoin(schema.users, (0, drizzle_orm_1.eq)(schema.blogs.authorId, schema.users.id));
        return rows;
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
    __metadata("design:paramtypes", [node_postgres_1.NodePgDatabase])
], BlogsService);
//# sourceMappingURL=blogs.service.js.map