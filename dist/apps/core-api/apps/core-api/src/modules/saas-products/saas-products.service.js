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
exports.SaasProductsService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../../../../../libs/database/src");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const schema = require("../../../../../libs/database/src");
const drizzle_orm_1 = require("drizzle-orm");
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
    __metadata("design:paramtypes", [node_postgres_1.NodePgDatabase])
], SaasProductsService);
//# sourceMappingURL=saas-products.service.js.map