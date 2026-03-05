import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE_DB } from '@core/database/database.module';
import * as schema from '@core/database/schema';

@Injectable()
export class MeetingsService {
    constructor(
        @Inject(DRIZZLE_DB) private conn: NodePgDatabase<typeof schema>,
    ) { }

    async createMeeting(hostId: number, data: { title: string; scheduledTime: Date }) {
        const meeting = await this.conn.insert(schema.emsMeetings).values({
            hostId,
            title: data.title,
            scheduledTime: data.scheduledTime,
            status: 'scheduled',
        }).returning();
        return meeting[0];
    }

    async getMeetings() {
        return this.conn.select().from(schema.emsMeetings);
    }

    async getMeetingById(id: number) {
        const result = await this.conn.select().from(schema.emsMeetings).where(eq(schema.emsMeetings.id, id)).limit(1);
        return result[0];
    }

    async updateMeetingStatus(id: number, status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled') {
        const result = await this.conn.update(schema.emsMeetings)
            .set({ status })
            .where(eq(schema.emsMeetings.id, id))
            .returning();
        return result[0];
    }

    async addAttendee(meetingId: number, userId: number, joinedAt: Date = new Date()) {
        const attendee = await this.conn.insert(schema.emsMeetingAttendees).values({
            meetingId,
            userId,
            joinedAt,
        }).returning();
        return attendee[0];
    }
}
