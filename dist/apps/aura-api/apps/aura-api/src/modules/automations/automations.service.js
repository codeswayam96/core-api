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
exports.AutomationsService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../../../../../libs/database/src");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const schema = require("../../../../../libs/database/src");
const drizzle_orm_1 = require("drizzle-orm");
const uuid_1 = require("uuid");
let AutomationsService = class AutomationsService {
    constructor(db) {
        this.db = db;
    }
    async getUserAutomations(userId) {
        return this.db.query.afAutomations.findMany({
            where: (0, drizzle_orm_1.eq)(schema.afAutomations.userId, userId),
            with: {
                triggers: true,
                listeners: true,
                keywords: true,
                posts: true
            }
        });
    }
    async getAutomation(id, userId) {
        const automation = await this.db.query.afAutomations.findFirst({
            where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.afAutomations.id, id), (0, drizzle_orm_1.eq)(schema.afAutomations.userId, userId)),
            with: {
                triggers: true,
                listeners: true,
                keywords: true,
                posts: true
            }
        });
        if (!automation)
            throw new common_1.NotFoundException('Automation not found');
        return automation;
    }
    async createAutomation(userId) {
        const id = (0, uuid_1.v4)();
        const [automation] = await this.db.insert(schema.afAutomations)
            .values({ id, userId, name: 'Untitled' })
            .returning();
        return automation;
    }
    async updateAutomation(id, userId, data) {
        var _a, _b, _c;
        await this.getAutomation(id, userId);
        if (((_a = data.triggerTypes) === null || _a === void 0 ? void 0 : _a.includes('DM')) && (!data.keywords || data.keywords.length === 0)) {
            const existingUniversal = await this.db.query.afAutomations.findFirst({
                where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.afAutomations.userId, userId), (0, drizzle_orm_1.eq)(schema.afAutomations.active, 1), (0, drizzle_orm_1.not)((0, drizzle_orm_1.eq)(schema.afAutomations.id, id))),
                with: { triggers: true, keywords: true }
            });
            if (existingUniversal) {
                const triggers = existingUniversal.triggers;
                const keywords = existingUniversal.keywords;
                const hasDmTrigger = triggers === null || triggers === void 0 ? void 0 : triggers.some(t => t.type === 'DM');
                const hasNoKeywords = !keywords || keywords.length === 0;
                if (hasDmTrigger && hasNoKeywords) {
                    throw new common_1.BadRequestException('Only one Universal DM automation is allowed.');
                }
            }
        }
        await this.db.update(schema.afAutomations)
            .set({
            name: data.name !== undefined ? data.name : undefined,
            active: data.active !== undefined ? (data.active ? 1 : 0) : undefined
        })
            .where((0, drizzle_orm_1.eq)(schema.afAutomations.id, id));
        if (data.triggerTypes && data.triggerTypes.length > 0) {
            await this.db.delete(schema.afTriggers).where((0, drizzle_orm_1.eq)(schema.afTriggers.automationId, id));
            await this.db.insert(schema.afTriggers).values(data.triggerTypes.map(type => ({
                id: (0, uuid_1.v4)(),
                automationId: id,
                type,
            })));
        }
        if (data.keywords) {
            await this.db.delete(schema.afKeywords).where((0, drizzle_orm_1.eq)(schema.afKeywords.automationId, id));
            if (data.keywords.length > 0) {
                await this.db.insert(schema.afKeywords).values(data.keywords.map(word => ({
                    id: (0, uuid_1.v4)(),
                    automationId: id,
                    word,
                })));
            }
        }
        if (data.listenerType) {
            const existingListener = await this.db.query.afListeners.findFirst({
                where: (0, drizzle_orm_1.eq)(schema.afListeners.automationId, id)
            });
            const listenerData = {
                listener: data.listenerType,
                prompt: data.listenerType === 'SMART_AI' ? data.prompt : null
            };
            const isDmTrigger = (_b = data.triggerTypes) === null || _b === void 0 ? void 0 : _b.includes('DM');
            const isCommentTrigger = (_c = data.triggerTypes) === null || _c === void 0 ? void 0 : _c.includes('COMMENT');
            if (isDmTrigger)
                listenerData.dmReply = data.reply;
            if (isCommentTrigger) {
                listenerData.commentReply = data.reply;
                if (data.dmReply)
                    listenerData.dmReply = data.dmReply;
            }
            if (existingListener) {
                await this.db.update(schema.afListeners)
                    .set(listenerData)
                    .where((0, drizzle_orm_1.eq)(schema.afListeners.automationId, id));
            }
            else {
                await this.db.insert(schema.afListeners).values(Object.assign({ id: (0, uuid_1.v4)(), automationId: id }, listenerData));
            }
        }
        if (data.posts) {
            await this.db.delete(schema.afPosts).where((0, drizzle_orm_1.eq)(schema.afPosts.automationId, id));
            if (data.posts.length > 0) {
                await this.db.insert(schema.afPosts).values(data.posts.map(p => ({
                    id: (0, uuid_1.v4)(),
                    automationId: id,
                    postid: p.postid,
                    caption: p.caption,
                    media: p.media,
                    mediaType: p.mediaType,
                })));
            }
        }
        return { success: true };
    }
    async deleteAutomation(id, userId) {
        await this.getAutomation(id, userId);
        await this.db.delete(schema.afAutomations).where((0, drizzle_orm_1.eq)(schema.afAutomations.id, id));
        return { success: true };
    }
};
exports.AutomationsService = AutomationsService;
exports.AutomationsService = AutomationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_1.DRIZZLE_DB)),
    __metadata("design:paramtypes", [node_postgres_1.NodePgDatabase])
], AutomationsService);
//# sourceMappingURL=automations.service.js.map