import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DRIZZLE_DB } from '@shared/database';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@shared/database';
import { eq } from 'drizzle-orm';

@Injectable()
export class SaasProductsService {
    constructor(@Inject(DRIZZLE_DB) private db: NodePgDatabase<typeof schema>) { }

    async findAll() {
        return this.db.select().from(schema.saasProducts);
    }

    async findOne(id: number) {
        const result = await this.db.query.saasProducts.findFirst({
            where: eq(schema.saasProducts.id, id),
        });
        if (!result) throw new NotFoundException('SaaS Product not found');
        return result;
    }

    async create(data: { saasId: string; icon?: string; name: string; tag: string; description: string; domain: string; status: string; featured?: string; price?: number }) {
        const [product] = await this.db.insert(schema.saasProducts).values(data).returning();
        return product;
    }

    async update(id: number, data: { saasId?: string; icon?: string; name?: string; tag?: string; description?: string; domain?: string; status?: string; featured?: string; price?: number }) {
        const [product] = await this.db.update(schema.saasProducts)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(schema.saasProducts.id, id))
            .returning();
        if (!product) throw new NotFoundException('SaaS Product not found');
        return product;
    }

    async remove(id: number) {
        const [product] = await this.db.delete(schema.saasProducts).where(eq(schema.saasProducts.id, id)).returning();
        if (!product) throw new NotFoundException('SaaS Product not found');
        return product;
    }
}
