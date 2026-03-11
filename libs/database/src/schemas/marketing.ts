import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { users } from './core';

export const blogs = pgTable('blogs', {
    id: serial('id').primaryKey(),
    saas: text('saas').notNull(),
    tag: text('tag').notNull(),
    title: text('title').notNull(),
    slug: text('slug').notNull(),
    excerpt: text('excerpt').notNull(),
    content: text('content').notNull(),
    featured: text('featured').notNull().default('false'),
    authorId: integer('author_id').notNull().references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const saasProducts = pgTable('saas_products', {
    id: serial('id').primaryKey(),
    saasId: text('saas_id').notNull().unique(), // The id used as slug in frontend
    icon: text('icon'),
    name: text('name').notNull(),
    tag: text('tag').notNull(),
    description: text('description').notNull(),
    domain: text('domain').notNull(),
    status: text('status').notNull(), // 'Live' | 'Beta' | 'Soon'
    featured: text('featured').notNull().default('false'),
    price: integer('price').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const blogsRelations = relations(blogs, ({ one }) => ({
    author: one(users, {
        fields: [blogs.authorId],
        references: [users.id],
    }),
}));
