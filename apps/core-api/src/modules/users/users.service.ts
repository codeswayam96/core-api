import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE_DB } from '@core/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@core/database';
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

    async findById(id: number) {
        const result = await this.db.query.users.findFirst({
            where: eq(schema.users.id, id),
        });
        if (result) {
            const { password, ...user } = result;
            return user;
        }
        return null;
    }

    async create(data: { email: string; name?: string; password?: string; clerkId?: string; googleId?: string }) {
        const [user] = await this.db.insert(schema.users).values(data).returning();
        return user;
    }

    async upsertGoogleUser(googleId: string, email: string, name: string) {
        // Check if user already exists
        const existing = await this.findOne(email);
        if (existing) {
            if (!existing.googleId) {
                // Link account
                const [updated] = await this.db.update(schema.users)
                    .set({ googleId, name: existing.name || name })
                    .where(eq(schema.users.id, existing.id))
                    .returning();
                return updated;
            }
            return existing;
        }

        const [user] = await this.db.insert(schema.users).values({
            email,
            googleId,
            name,
            password: '', // Managed by Google
        }).returning();
        return user;
    }

    async createFromClerk(clerkId: string, email: string) {
        // Check if user already exists
        const existing = await this.findOne(email);
        if (existing) {
            if (!existing.clerkId) {
                // Link account if it existed before clerk integration
                await this.db.update(schema.users).set({ clerkId }).where(eq(schema.users.id, existing.id));
            }
            return existing;
        }

        const [user] = await this.db.insert(schema.users).values({
            email,
            clerkId,
            password: '', // Empty password since it's managed by Clerk
        }).returning();
        return user;
    }
}
