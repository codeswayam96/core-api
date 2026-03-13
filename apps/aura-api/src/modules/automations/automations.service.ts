import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { DRIZZLE_DB } from '@core/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@core/database';
import { eq, and, not } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AutomationsService {
    constructor(@Inject(DRIZZLE_DB) private db: NodePgDatabase<typeof schema>) { }

    async getUserAutomations(userId: number) {
        return this.db.query.afAutomations.findMany({
            where: eq(schema.afAutomations.userId, userId),
            with: {
                triggers: true,
                listeners: true,
                keywords: true,
                posts: true
            }
        });
    }

    async getAutomation(id: string, userId: number) {
        const automation = await this.db.query.afAutomations.findFirst({
            where: and(eq(schema.afAutomations.id, id), eq(schema.afAutomations.userId, userId)),
            with: {
                triggers: true,
                listeners: true,
                keywords: true,
                posts: true
            }
        });

        if (!automation) throw new NotFoundException('Automation not found');
        return automation;
    }

    async createAutomation(userId: number, name?: string) {
        const id = uuidv4();
        const [automation] = await this.db.insert(schema.afAutomations)
            .values({ id, userId, name: name?.trim() || 'Untitled' })
            .returning();
        return automation;
    }

    async updateAutomation(id: string, userId: number, data: any) {
        // First verify ownership
        await this.getAutomation(id, userId);

        if (data.triggerTypes?.includes('DM') && (!data.keywords || data.keywords.length === 0)) {
            // Check for existing universal DM
            const existingUniversal = await this.db.query.afAutomations.findFirst({
                where: and(
                    eq(schema.afAutomations.userId, userId),
                    eq(schema.afAutomations.active, 1),
                    not(eq(schema.afAutomations.id, id))
                ),
                with: { triggers: true, keywords: true }
            });

            if (existingUniversal) {
                const triggers = existingUniversal.triggers as any[];
                const keywords = existingUniversal.keywords as any[];
                const hasDmTrigger = triggers?.some(t => t.type === 'DM');
                const hasNoKeywords = !keywords || keywords.length === 0;
                if (hasDmTrigger && hasNoKeywords) {
                    throw new BadRequestException('Only one Universal DM automation is allowed.');
                }
            }
        }

        // 1. Update basic info
        await this.db.update(schema.afAutomations)
            .set({
                name: data.name !== undefined ? data.name : undefined,
                active: data.active !== undefined ? (data.active ? 1 : 0) : undefined
            })
            .where(eq(schema.afAutomations.id, id));

        // 2. Update Triggers
        if (data.triggerTypes && data.triggerTypes.length > 0) {
            await this.db.delete(schema.afTriggers).where(eq(schema.afTriggers.automationId, id));
            await this.db.insert(schema.afTriggers).values(
                data.triggerTypes.map(type => ({
                    id: uuidv4(),
                    automationId: id,
                    type,
                }))
            );
        }

        // 3. Update Keywords
        if (data.keywords) {
            await this.db.delete(schema.afKeywords).where(eq(schema.afKeywords.automationId, id));
            if (data.keywords.length > 0) {
                await this.db.insert(schema.afKeywords).values(
                    data.keywords.map(word => ({
                        id: uuidv4(),
                        automationId: id,
                        word,
                    }))
                );
            }
        }

        // 4. Update Listener
        if (data.listenerType) {
            const existingListener = await this.db.query.afListeners.findFirst({
                where: eq(schema.afListeners.automationId, id)
            });

            const listenerData: any = {
                listener: data.listenerType,
                prompt: data.listenerType === 'SMART_AI' ? data.prompt : null
            };

            const isDmTrigger = data.triggerTypes?.includes('DM');
            const isCommentTrigger = data.triggerTypes?.includes('COMMENT');

            if (isDmTrigger) listenerData.dmReply = data.reply;
            if (isCommentTrigger) {
                listenerData.commentReply = data.reply;
                if (data.dmReply) listenerData.dmReply = data.dmReply;
            }

            if (existingListener) {
                await this.db.update(schema.afListeners)
                    .set(listenerData)
                    .where(eq(schema.afListeners.automationId, id));
            } else {
                await this.db.insert(schema.afListeners).values({
                    id: uuidv4(),
                    automationId: id,
                    ...listenerData
                });
            }
        }

        // 5. Update Posts
        if (data.posts) {
            await this.db.delete(schema.afPosts).where(eq(schema.afPosts.automationId, id));
            if (data.posts.length > 0) {
                await this.db.insert(schema.afPosts).values(
                    data.posts.map(p => ({
                        id: uuidv4(),
                        automationId: id,
                        postid: p.postid,
                        caption: p.caption,
                        media: p.media,
                        mediaType: p.mediaType,
                    }))
                );
            }
        }

        return { success: true };
    }

    async deleteAutomation(id: string, userId: number) {
        await this.getAutomation(id, userId); // verify ownership
        await this.db.delete(schema.afAutomations).where(eq(schema.afAutomations.id, id));
        return { success: true };
    }
}
