import { pgSchema, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { users } from './core';

export const mailtrackerSchema = pgSchema('mailtracker');
export const instadmSchema = pgSchema('instadm');

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
