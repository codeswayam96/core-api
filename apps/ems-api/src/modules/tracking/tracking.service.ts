import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE_DB } from '@core/database/database.module';
import * as schema from '@core/database';

@Injectable()
export class TrackingService {
    constructor(
        @Inject(DRIZZLE_DB) private conn: NodePgDatabase<typeof schema>,
    ) { }

    async startSession(userId: number) {
        const session = await this.conn.insert(schema.emsSessions).values({
            userId,
        }).returning();
        return session[0];
    }

    async endSession(sessionId: number) {
        const session = await this.conn.update(schema.emsSessions)
            .set({ logoutTime: new Date() })
            .where(eq(schema.emsSessions.id, sessionId))
            .returning();
        return session[0];
    }

    async logActivity(sessionId: number, userId: number, route: string, timeSpentSeconds: number, idleTimeSeconds: number) {
        const activity = await this.conn.insert(schema.emsPageActivities).values({
            sessionId,
            userId,
            route,
            timeSpentSeconds,
            idleTimeSeconds,
        }).returning();

        // Optionally update activeDurationMinutes in the session here based on logic
        return activity[0];
    }
}
