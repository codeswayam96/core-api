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
exports.IntegrationsService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../../../../../libs/database/src");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const schema = require("../../../../../libs/database/src");
const drizzle_orm_1 = require("drizzle-orm");
const axios_1 = require("axios");
const uuid_1 = require("uuid");
let IntegrationsService = class IntegrationsService {
    constructor(db) {
        this.db = db;
    }
    async getInstagramPosts(userId) {
        const integration = await this.db.query.afIntegrations.findFirst({
            where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.afIntegrations.userId, userId), (0, drizzle_orm_1.eq)(schema.afIntegrations.name, 'INSTAGRAM'))
        });
        if (!integration || !integration.token || !integration.instagramId) {
            return { status: 404, data: [] };
        }
        try {
            const response = await axios_1.default.get(`https://graph.facebook.com/v21.0/${integration.instagramId}/media`, {
                params: {
                    fields: 'id,caption,media_url,media_type,timestamp,thumbnail_url,permalink',
                    access_token: integration.token,
                    limit: 20
                }
            });
            return { status: 200, data: response.data.data };
        }
        catch (error) {
            console.error('Error fetching Instagram posts:', error);
            return { status: 500, data: [] };
        }
    }
    async disconnectIntegration(id, userId) {
        const integration = await this.db.query.afIntegrations.findFirst({
            where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.afIntegrations.id, id), (0, drizzle_orm_1.eq)(schema.afIntegrations.userId, userId))
        });
        if (!integration) {
            throw new common_1.NotFoundException('Integration not found');
        }
        await this.db.delete(schema.afIntegrations).where((0, drizzle_orm_1.eq)(schema.afIntegrations.id, id));
        return { status: 200, message: 'Disconnected successfully' };
    }
    async createIntegration(data) {
        await this.db.delete(schema.afIntegrations).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.afIntegrations.userId, data.userId), (0, drizzle_orm_1.eq)(schema.afIntegrations.name, data.name)));
        const id = (0, uuid_1.v4)();
        await this.db.insert(schema.afIntegrations).values({
            id,
            userId: data.userId,
            token: data.token,
            instagramId: data.instagramId,
            pageId: data.pageId,
            name: data.name
        });
        return { success: true };
    }
};
exports.IntegrationsService = IntegrationsService;
exports.IntegrationsService = IntegrationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_1.DRIZZLE_DB)),
    __metadata("design:paramtypes", [node_postgres_1.NodePgDatabase])
], IntegrationsService);
//# sourceMappingURL=integrations.service.js.map