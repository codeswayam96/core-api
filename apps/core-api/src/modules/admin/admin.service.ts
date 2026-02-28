import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DRIZZLE_DB } from '@shared/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@shared/database';
import { eq } from 'drizzle-orm';

@Injectable()
export class AdminService {
    constructor(@Inject(DRIZZLE_DB) private db: NodePgDatabase<typeof schema>) { }

    async listUsers() {
        const result = await this.db.select({
            id: schema.users.id,
            email: schema.users.email,
            role: schema.users.role,
            createdAt: schema.users.createdAt,
        }).from(schema.users);
        return result;
    }

    async updateUserRole(id: number, role: 'user' | 'admin' | 'superadmin') {
        const [user] = await this.db.update(schema.users)
            .set({ role })
            .where(eq(schema.users.id, id))
            .returning({ id: schema.users.id, email: schema.users.email, role: schema.users.role });

        if (!user) throw new NotFoundException('User not found');
        return user;
    }
}
