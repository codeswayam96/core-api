import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DRIZZLE_DB } from '@core/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@core/database';
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

    async getAuthSettings() {
        const settings = await this.db.select().from(schema.appSettings).limit(1);
        if (settings.length === 0) {
            // Use defaults if missing
            return { authType: 'clerk' };
        }
        return settings[0];
    }

    async updateAuthSettings(authType: string) {
        let settings = await this.getAuthSettings();
        const existing = await this.db.select().from(schema.appSettings).limit(1);

        if (existing.length === 0) {
            const [newSettings] = await this.db.insert(schema.appSettings).values({ authType }).returning();
            return newSettings;
        }

        const [updated] = await this.db.update(schema.appSettings)
            .set({ authType })
            .where(eq(schema.appSettings.id, existing[0].id))
            .returning();

        return updated;
    }
}
