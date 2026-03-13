"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRelations = exports.saasProducts = exports.blogs = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const core_1 = require("./core");
exports.blogs = (0, pg_core_1.pgTable)('blogs', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    saas: (0, pg_core_1.text)('saas').notNull(),
    tag: (0, pg_core_1.text)('tag').notNull(),
    title: (0, pg_core_1.text)('title').notNull(),
    slug: (0, pg_core_1.text)('slug').notNull(),
    excerpt: (0, pg_core_1.text)('excerpt').notNull(),
    content: (0, pg_core_1.text)('content').notNull(),
    featured: (0, pg_core_1.text)('featured').notNull().default('false'),
    status: (0, pg_core_1.text)('status').notNull().default('draft'),
    views: (0, pg_core_1.integer)('views').notNull().default(0),
    category: (0, pg_core_1.text)('category').notNull().default(''),
    authorId: (0, pg_core_1.integer)('author_id').notNull().references(() => core_1.users.id),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
exports.saasProducts = (0, pg_core_1.pgTable)('saas_products', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    saasId: (0, pg_core_1.text)('saas_id').notNull().unique(),
    icon: (0, pg_core_1.text)('icon'),
    name: (0, pg_core_1.text)('name').notNull(),
    tag: (0, pg_core_1.text)('tag').notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
    domain: (0, pg_core_1.text)('domain').notNull(),
    status: (0, pg_core_1.text)('status').notNull(),
    featured: (0, pg_core_1.text)('featured').notNull().default('false'),
    price: (0, pg_core_1.integer)('price').notNull().default(0),
    subscribers: (0, pg_core_1.integer)('subscribers').notNull().default(0),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
exports.blogsRelations = (0, drizzle_orm_1.relations)(exports.blogs, ({ one }) => ({
    author: one(core_1.users, {
        fields: [exports.blogs.authorId],
        references: [core_1.users.id],
    }),
}));
//# sourceMappingURL=marketing.js.map