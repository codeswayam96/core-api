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
exports.WebhooksService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../../../../../libs/database/src");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const schema = require("../../../../../libs/database/src");
const drizzle_orm_1 = require("drizzle-orm");
const instagram_1 = require("../../../../../libs/instagram/index");
const gemini_1 = require("../../../../../libs/gemini/index");
const uuid_1 = require("uuid");
let WebhooksService = class WebhooksService {
    constructor(db) {
        this.db = db;
    }
    async verifyWebhook(mode, token, challenge) {
        const VERIFY_TOKEN = process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN || 'auraflow_token';
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            return challenge;
        }
        else {
            throw new common_1.NotFoundException('Invalid Token');
        }
    }
    async handleWebhookEvent(body) {
        if (body.object !== 'instagram')
            return { status: 404, message: 'Not Instagram' };
        this.processWebhookAsync(body).catch(err => console.error('Webhook processing error:', err));
        return { status: 200, message: 'EVENT_RECEIVED' };
    }
    async processWebhookAsync(body) {
        for (const entry of body.entry) {
            const instagramAccountId = entry.id;
            if (entry.messaging) {
                for (const event of entry.messaging) {
                    await this.handleDm(instagramAccountId, event);
                }
            }
            if (entry.changes) {
                for (const event of entry.changes) {
                    if (event.field === 'comments') {
                        await this.handleComment(instagramAccountId, event.value);
                    }
                }
            }
        }
    }
    async handleDm(instagramAccountId, event) {
        var _a, _b, _c;
        const senderId = event.sender.id;
        const messageText = (_a = event.message) === null || _a === void 0 ? void 0 : _a.text;
        if (((_b = event.message) === null || _b === void 0 ? void 0 : _b.is_echo) || !messageText || senderId === instagramAccountId)
            return;
        const integration = await this.db.query.afIntegrations.findFirst({
            where: (0, drizzle_orm_1.eq)(schema.afIntegrations.instagramId, instagramAccountId),
        });
        if (!integration)
            return;
        let conversation = await this.db.query.afConversations.findFirst({
            where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.afConversations.userId, integration.userId), (0, drizzle_orm_1.eq)(schema.afConversations.recipientId, senderId))
        });
        if (!conversation) {
            const [newConv] = await this.db.insert(schema.afConversations).values({
                id: (0, uuid_1.v4)(),
                userId: integration.userId,
                recipientId: senderId
            }).returning();
            conversation = newConv;
        }
        await this.db.insert(schema.afMessages).values({
            id: (0, uuid_1.v4)(),
            conversationId: conversation.id,
            role: 'USER',
            content: messageText
        });
        const automations = await this.db.query.afAutomations.findMany({
            where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.afAutomations.userId, integration.userId), (0, drizzle_orm_1.eq)(schema.afAutomations.active, 1)),
            with: { triggers: true, keywords: true, listeners: true }
        });
        let bestMatch = null;
        let fallbackMatch = null;
        for (const automation of automations) {
            const triggers = automation.triggers || [];
            if (!triggers.some(t => t.type === 'DM'))
                continue;
            const keywords = automation.keywords || [];
            if (keywords.length > 0) {
                if (keywords.some(k => messageText.toLowerCase().includes(k.word.toLowerCase()))) {
                    bestMatch = automation;
                    break;
                }
            }
            else {
                if (!fallbackMatch)
                    fallbackMatch = automation;
            }
        }
        const automationToRun = bestMatch || fallbackMatch;
        if (!automationToRun || !((_c = automationToRun.listeners) === null || _c === void 0 ? void 0 : _c[0]))
            return;
        const listener = automationToRun.listeners[0];
        const accessToken = integration.token;
        if (listener.listener === 'MESSAGE') {
            const replyText = listener.dmReply || "Thanks!";
            await (0, instagram_1.sendInstagramMessage)(accessToken, senderId, replyText, integration.pageId);
            await this.logAssistantMessage(conversation.id, replyText);
        }
        else if (listener.listener === 'SMART_AI') {
            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey)
                return;
            const historyMessages = await this.db.query.afMessages.findMany({
                where: (0, drizzle_orm_1.eq)(schema.afMessages.conversationId, conversation.id),
                orderBy: (0, drizzle_orm_1.sql) `${schema.afMessages.createdAt} desc`,
                limit: 10
            });
            const history = historyMessages.reverse().map(m => ({
                role: m.role === 'USER' ? 'user' : 'model',
                parts: m.content
            }));
            const aiResponse = await (0, gemini_1.generateAIResponse)(apiKey, listener.prompt || "You are a helpful assistant.", messageText, history.slice(0, -1));
            await (0, instagram_1.sendInstagramMessage)(accessToken, senderId, aiResponse, integration.pageId);
            await this.logAssistantMessage(conversation.id, aiResponse);
        }
    }
    async handleComment(instagramAccountId, value) {
        var _a;
        const commenterId = value.from.id;
        const commentText = value.text;
        const mediaId = value.media.id;
        if (commenterId === instagramAccountId)
            return;
        const integration = await this.db.query.afIntegrations.findFirst({
            where: (0, drizzle_orm_1.eq)(schema.afIntegrations.instagramId, instagramAccountId)
        });
        if (!integration)
            return;
        const automations = await this.db.query.afAutomations.findMany({
            where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.afAutomations.userId, integration.userId), (0, drizzle_orm_1.eq)(schema.afAutomations.active, 1)),
            with: { triggers: true, keywords: true, listeners: true, posts: true }
        });
        let bestMatch = null;
        let fallbackMatch = null;
        for (const automation of automations) {
            const triggers = automation.triggers || [];
            if (!triggers.some(t => t.type === 'COMMENT'))
                continue;
            const posts = automation.posts || [];
            if (posts.length > 0 && !posts.some(p => p.postid === mediaId))
                continue;
            const keywords = automation.keywords || [];
            if (keywords.length > 0) {
                if (keywords.some(k => commentText.toLowerCase().includes(k.word.toLowerCase()))) {
                    bestMatch = automation;
                    break;
                }
            }
            else {
                if (!fallbackMatch)
                    fallbackMatch = automation;
            }
        }
        const automationToRun = bestMatch || fallbackMatch;
        if (!automationToRun || !((_a = automationToRun.listeners) === null || _a === void 0 ? void 0 : _a[0]))
            return;
        const listener = automationToRun.listeners[0];
        const accessToken = integration.token;
        let replyText = "";
        if (listener.listener === 'MESSAGE') {
            replyText = listener.commentReply || "Thanks!";
        }
        else if (listener.listener === 'SMART_AI') {
            const apiKey = process.env.GEMINI_API_KEY;
            if (apiKey) {
                replyText = await (0, gemini_1.generateAIResponse)(apiKey, "You are a helpful assistant replying to a comment.", commentText, []);
            }
            else {
                replyText = "Thanks!";
            }
        }
        await (0, instagram_1.sendInstagramCommentReply)(accessToken, value.id, replyText);
        if (listener.dmReply) {
            await (0, instagram_1.sendInstagramMessage)(accessToken, commenterId, listener.dmReply, integration.pageId);
        }
    }
    async logAssistantMessage(conversationId, content) {
        await this.db.insert(schema.afMessages).values({
            id: (0, uuid_1.v4)(),
            conversationId,
            role: 'ASSISTANT',
            content
        });
    }
};
exports.WebhooksService = WebhooksService;
exports.WebhooksService = WebhooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_1.DRIZZLE_DB)),
    __metadata("design:paramtypes", [node_postgres_1.NodePgDatabase])
], WebhooksService);
//# sourceMappingURL=webhooks.service.js.map