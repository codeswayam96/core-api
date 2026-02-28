import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DRIZZLE_DB } from '@shared/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@shared/database';
import { eq } from 'drizzle-orm';

@Injectable()
export class BlogsService {
    constructor(@Inject(DRIZZLE_DB) private db: NodePgDatabase<typeof schema>) { }

    async findAll() {
        return this.db.select().from(schema.blogs);
    }

    async findOne(id: number) {
        const result = await this.db.query.blogs.findFirst({
            where: eq(schema.blogs.id, id),
            with: { author: { columns: { id: true, email: true, role: true } } }
        });
        if (!result) throw new NotFoundException('Blog not found');
        return result;
    }

    async create(data: { saas: string; tag: string; title: string; slug: string; excerpt: string; content: string; featured?: string; authorId: number }) {
        const [blog] = await this.db.insert(schema.blogs).values(data).returning();
        return blog;
    }

    async update(id: number, data: { saas?: string; tag?: string; title?: string; slug?: string; excerpt?: string; content?: string; featured?: string }) {
        const [blog] = await this.db.update(schema.blogs)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(schema.blogs.id, id))
            .returning();
        if (!blog) throw new NotFoundException('Blog not found');
        return blog;
    }

    async remove(id: number) {
        const [blog] = await this.db.delete(schema.blogs).where(eq(schema.blogs.id, id)).returning();
        if (!blog) throw new NotFoundException('Blog not found');
        return blog;
    }
}
