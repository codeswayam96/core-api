import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DRIZZLE_DB } from '@core/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@core/database';
import { eq, and } from 'drizzle-orm';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class IntegrationsService {
    constructor(@Inject(DRIZZLE_DB) private db: NodePgDatabase<typeof schema>) { }

    async getAllIntegrations(userId: number) {
        const integrations = await this.db.query.afIntegrations.findMany({
            where: eq(schema.afIntegrations.userId, userId)
        });
        return integrations;
    }

    async getInstagramPosts(userId: number) {
        const integration = await this.db.query.afIntegrations.findFirst({
            where: and(
                eq(schema.afIntegrations.userId, userId),
                eq(schema.afIntegrations.name, 'INSTAGRAM')
            )
        });

        if (!integration || !integration.token || !integration.instagramId) {
            return { status: 404, data: [] };
        }

        try {
            const response = await axios.get(`https://graph.facebook.com/v21.0/${integration.instagramId}/media`, {
                params: {
                    fields: 'id,caption,media_url,media_type,timestamp,thumbnail_url,permalink',
                    access_token: integration.token,
                    limit: 20
                }
            });

            return { status: 200, data: response.data.data };
        } catch (error) {
            console.error('Error fetching Instagram posts:', error);
            return { status: 500, data: [] };
        }
    }

    async disconnectIntegration(id: string, userId: number) {
        const integration = await this.db.query.afIntegrations.findFirst({
            where: and(
                eq(schema.afIntegrations.id, id),
                eq(schema.afIntegrations.userId, userId)
            )
        });

        if (!integration) {
            throw new NotFoundException('Integration not found');
        }

        await this.db.delete(schema.afIntegrations).where(eq(schema.afIntegrations.id, id));
        return { status: 200, message: 'Disconnected successfully' };
    }

    async createIntegration(data: {
        userId: number;
        token: string;
        instagramId?: string;
        pageId?: string;
        name: 'INSTAGRAM';
    }) {
        // Delete existing integration for this user to prevent duplicates
        await this.db.delete(schema.afIntegrations).where(
            and(
                eq(schema.afIntegrations.userId, data.userId),
                eq(schema.afIntegrations.name, data.name)
            )
        );

        // If instagramId is provided, also delete any integration with the same instagramId
        // (in case another user had it before, or to handle reconnection)
        if (data.instagramId) {
            await this.db.delete(schema.afIntegrations).where(
                eq(schema.afIntegrations.instagramId, data.instagramId)
            );
        }

        const id = uuidv4();
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
}
