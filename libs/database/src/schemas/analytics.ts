import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { users } from './core';

export const analyticsEvents = pgTable('analytics_events', {
    id: serial('id').primaryKey(),
    event: text('event').notNull(), // 'pageview' | 'click' | 'session_start' | 'session_end'
    page: text('page'), // URL path e.g. '/blog/my-post'
    source: text('source'), // 'organic' | 'direct' | 'social' | 'referral' | 'email'
    userId: integer('user_id').references(() => users.id),
    sessionId: text('session_id'), // groups events into sessions
    metadata: text('metadata'), // JSON string for extra data
    createdAt: timestamp('created_at').defaultNow(),
});
