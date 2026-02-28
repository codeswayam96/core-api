import { pgSchema, pgTable, serial, text, timestamp, integer, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const mailtrackerSchema = pgSchema('mailtracker');
export const instadmSchema = pgSchema('instadm');

export const roleEnum = pgEnum('role', ['user', 'admin', 'superadmin']);

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: text('email').unique().notNull(),
    password: text('password').notNull(),
    role: roleEnum('role').default('user').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export const sessions = pgTable('sessions', {
    id: serial('id').primaryKey(),
    token: text('token').unique().notNull(),
    userId: integer('user_id').notNull().references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
});

export const trackingLogs = mailtrackerSchema.table('tracking_logs', {
    id: serial('id').primaryKey(),
    action: text('action').notNull(),
    userId: integer('user_id').notNull().references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
});

export const autoReplies = instadmSchema.table('auto_replies', {
    id: serial('id').primaryKey(),
    message: text('message').notNull(),
    userId: integer('user_id').notNull().references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
});

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

export const usersRelations = relations(users, ({ many }) => ({
    sessions: many(sessions),
    trackingLogs: many(trackingLogs),
    autoReplies: many(autoReplies),
    blogs: many(blogs),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}));

export const trackingLogsRelations = relations(trackingLogs, ({ one }) => ({
    user: one(users, {
        fields: [trackingLogs.userId],
        references: [users.id],
    }),
}));

export const autoRepliesRelations = relations(autoReplies, ({ one }) => ({
    user: one(users, {
        fields: [autoReplies.userId],
        references: [users.id],
    }),
}));

export const blogsRelations = relations(blogs, ({ one }) => ({
    author: one(users, {
        fields: [blogs.authorId],
        references: [users.id],
    }),
}));
