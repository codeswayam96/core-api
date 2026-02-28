import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE_DB } from '@shared/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@shared/database';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
    constructor(@Inject(DRIZZLE_DB) private db: NodePgDatabase<typeof schema>) { }

    async findOne(email: string) {
        const result = await this.db.query.users.findFirst({
            where: eq(schema.users.email, email),
        });
        return result || null;
    }

    async create(data: { email: string; password: string }) {
        const [user] = await this.db.insert(schema.users).values(data).returning();
        return user;
    }
}
