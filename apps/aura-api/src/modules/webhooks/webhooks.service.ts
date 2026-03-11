import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DRIZZLE_DB } from '@core/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@core/database';
import { eq, and, sql } from 'drizzle-orm';
import { sendInstagramMessage, sendInstagramCommentReply } from '@core/instagram';
import { generateAIResponse } from '@core/gemini';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class WebhooksService {
    constructor(@Inject(DRIZZLE_DB) private db: NodePgDatabase<typeof schema>) { }

    async verifyWebhook(mode: string, token: string, challenge: string) {
        const VERIFY_TOKEN = process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN || 'auraflow_token';
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            return challenge;
        } else {
            throw new NotFoundException('Invalid Token');
        }
    }

    async handleWebhookEvent(body: any) {
        if (body.object !== 'instagram') return { status: 404, message: 'Not Instagram' };

        // Process asynchronously to return 200 immediately
        this.processWebhookAsync(body).catch(err => console.error('Webhook processing error:', err));

        return { status: 200, message: 'EVENT_RECEIVED' };
    }

    private async processWebhookAsync(body: any) {
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

    private async handleDm(instagramAccountId: string, event: any) {
        const senderId = event.sender.id;
        const messageText = event.message?.text;
        if (event.message?.is_echo || !messageText || senderId === instagramAccountId) return;

        // 1. Find integration
        const integration = await this.db.query.afIntegrations.findFirst({
            where: eq(schema.afIntegrations.instagramId, instagramAccountId),
        });
        if (!integration) return;

        // 2. Upsert conversation
        let conversation = await this.db.query.afConversations.findFirst({
            where: and(
                eq(schema.afConversations.userId, integration.userId),
                eq(schema.afConversations.recipientId, senderId)
            )
        });

        if (!conversation) {
            const [newConv] = await this.db.insert(schema.afConversations).values({
                id: uuidv4(),
                userId: integration.userId,
                recipientId: senderId
            }).returning();
            conversation = newConv;
        }

        // 3. Log user message
        await this.db.insert(schema.afMessages).values({
            id: uuidv4(),
            conversationId: conversation.id,
            role: 'USER',
            content: messageText
        });

        // 4. Find Automations
        const automations = await this.db.query.afAutomations.findMany({
            where: and(eq(schema.afAutomations.userId, integration.userId), eq(schema.afAutomations.active, 1)),
            with: { triggers: true, keywords: true, listeners: true }
        });

        // Match Logic
        let bestMatch = null;
        let fallbackMatch = null;

        for (const automation of automations) {
            const triggers = (automation as any).triggers || [];
            if (!triggers.some(t => t.type === 'DM')) continue;

            const keywords = (automation as any).keywords || [];
            if (keywords.length > 0) {
                if (keywords.some(k => messageText.toLowerCase().includes(k.word.toLowerCase()))) {
                    bestMatch = automation;
                    break;
                }
            } else {
                if (!fallbackMatch) fallbackMatch = automation;
            }
        }

        const automationToRun = bestMatch || fallbackMatch;
        if (!automationToRun || !(automationToRun as any).listeners?.[0]) return;

        const listener = (automationToRun as any).listeners[0];
        const accessToken = integration.token;

        if (listener.listener === 'MESSAGE') {
            const replyText = listener.dmReply || "Thanks!";
            await sendInstagramMessage(accessToken, senderId, replyText, integration.pageId);
            await this.logAssistantMessage(conversation.id, replyText);
        } else if (listener.listener === 'SMART_AI') {
            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) return;

            const historyMessages = await this.db.query.afMessages.findMany({
                where: eq(schema.afMessages.conversationId, conversation.id),
                orderBy: sql`${schema.afMessages.createdAt} desc`,
                limit: 10
            });

            const history = historyMessages.reverse().map(m => ({
                role: m.role === 'USER' ? 'user' : 'model',
                parts: m.content
            })) as any[];

            const aiResponse = await generateAIResponse(apiKey, listener.prompt || "You are a helpful assistant.", messageText, history.slice(0, -1));
            await sendInstagramMessage(accessToken, senderId, aiResponse, integration.pageId);
            await this.logAssistantMessage(conversation.id, aiResponse);
        }
    }

    private async handleComment(instagramAccountId: string, value: any) {
        const commenterId = value.from.id;
        const commentText = value.text;
        const mediaId = value.media.id;
        if (commenterId === instagramAccountId) return;

        const integration = await this.db.query.afIntegrations.findFirst({
            where: eq(schema.afIntegrations.instagramId, instagramAccountId)
        });
        if (!integration) return;

        const automations = await this.db.query.afAutomations.findMany({
            where: and(eq(schema.afAutomations.userId, integration.userId), eq(schema.afAutomations.active, 1)),
            with: { triggers: true, keywords: true, listeners: true, posts: true }
        });

        let bestMatch = null;
        let fallbackMatch = null;

        for (const automation of automations) {
            const triggers = (automation as any).triggers || [];
            if (!triggers.some(t => t.type === 'COMMENT')) continue;

            const posts = (automation as any).posts || [];
            if (posts.length > 0 && !posts.some(p => p.postid === mediaId)) continue;

            const keywords = (automation as any).keywords || [];
            if (keywords.length > 0) {
                if (keywords.some(k => commentText.toLowerCase().includes(k.word.toLowerCase()))) {
                    bestMatch = automation;
                    break;
                }
            } else {
                if (!fallbackMatch) fallbackMatch = automation;
            }
        }

        const automationToRun = bestMatch || fallbackMatch;
        if (!automationToRun || !(automationToRun as any).listeners?.[0]) return;

        const listener = (automationToRun as any).listeners[0];
        const accessToken = integration.token;

        let replyText = "";
        if (listener.listener === 'MESSAGE') {
            replyText = listener.commentReply || "Thanks!";
        } else if (listener.listener === 'SMART_AI') {
            const apiKey = process.env.GEMINI_API_KEY;
            if (apiKey) {
                replyText = await generateAIResponse(apiKey, "You are a helpful assistant replying to a comment.", commentText, []);
            } else {
                replyText = "Thanks!";
            }
        }

        await sendInstagramCommentReply(accessToken, value.id, replyText);

        if (listener.dmReply) {
            await sendInstagramMessage(accessToken, commenterId, listener.dmReply, integration.pageId);
        }
    }

    private async logAssistantMessage(conversationId: string, content: string) {
        await this.db.insert(schema.afMessages).values({
            id: uuidv4(),
            conversationId,
            role: 'ASSISTANT',
            content
        });
    }
}
