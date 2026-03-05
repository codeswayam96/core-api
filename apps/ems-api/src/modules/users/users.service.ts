import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE_DB } from '@core/database/database.module';
import * as schema from '@core/database/schema';

@Injectable()
export class UsersService {
    constructor(
        @Inject(DRIZZLE_DB) private conn: NodePgDatabase<typeof schema>,
    ) { }

    async findByEmail(email: string) {
        const result = await this.conn.select().from(schema.emsUsers).where(eq(schema.emsUsers.email, email)).limit(1);
        return result[0];
    }

    async findById(id: number) {
        const result = await this.conn.select().from(schema.emsUsers).where(eq(schema.emsUsers.id, id)).limit(1);
        return result[0];
    }

    async create(data: typeof schema.emsUsers.$inferInsert) {
        const result = await this.conn.insert(schema.emsUsers).values(data).returning();
        return result[0];
    }
}
