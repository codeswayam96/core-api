import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DRIZZLE_DB } from '@core/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@core/database';
import { eq } from 'drizzle-orm';

@Injectable()
export class BlogsService {
    constructor(@Inject(DRIZZLE_DB) private db: NodePgDatabase<typeof schema>) { }

    async findAll() {
        const rows = await this.db
            .select({
                id: schema.blogs.id,
                saas: schema.blogs.saas,
                tag: schema.blogs.tag,
                title: schema.blogs.title,
                slug: schema.blogs.slug,
                excerpt: schema.blogs.excerpt,
                featured: schema.blogs.featured,
                status: schema.blogs.status,
                views: schema.blogs.views,
                category: schema.blogs.category,
                authorId: schema.blogs.authorId,
                authorName: schema.users.name,
                authorEmail: schema.users.email,
                createdAt: schema.blogs.createdAt,
                updatedAt: schema.blogs.updatedAt,
            })
            .from(schema.blogs)
            .leftJoin(schema.users, eq(schema.blogs.authorId, schema.users.id));
        return rows;
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

    async update(id: number, data: { saas?: string; tag?: string; title?: string; slug?: string; excerpt?: string; content?: string; featured?: string; status?: string; views?: number; category?: string }) {
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
