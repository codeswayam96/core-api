import { pgTable, serial, text, timestamp, pgEnum, integer, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { trackingLogs } from './misc';
import { autoReplies } from './misc';
import { blogs } from './marketing';

export const roleEnum = pgEnum('role', ['user', 'admin', 'superadmin', 'editor', 'viewer', 'subscriber']);

export const appSettings = pgTable('app_settings', {
    id: serial('id').primaryKey(),
    authType: text('auth_type').default('clerk').notNull(), // 'clerk' or 'custom'
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    clerkId: text('clerk_id').unique(),
    googleId: text('google_id').unique(),
    name: text('name'),
    email: text('email').unique().notNull(),
    password: text('password'), // password is no longer required with Clerk
    role: roleEnum('role').default('user').notNull(),
    status: text('status').default('active').notNull(), // 'active' | 'suspended' | 'pending'
    lastActiveAt: timestamp('last_active_at'),
    createdAt: timestamp('created_at').defaultNow(),
});

export const sessions = pgTable('sessions', {
    id: serial('id').primaryKey(),
    token: text('token').unique().notNull(),
    userId: integer('user_id').notNull().references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
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
