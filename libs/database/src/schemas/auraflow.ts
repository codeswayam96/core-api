import { pgSchema, text, timestamp, integer, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const auraflowSchema = pgSchema('auraflow');

export const afSubscriptionPlanEnum = pgEnum('af_subscription_plan', ['FREE', 'PRO']);
export const afIntegrationTypeEnum = pgEnum('af_integration_type', ['INSTAGRAM']);
export const afTriggerTypeEnum = pgEnum('af_trigger_type', ['DM', 'COMMENT']);
export const afListenerTypeEnum = pgEnum('af_listener_type', ['SMART_AI', 'MESSAGE']);
export const afAgentTypeEnum = pgEnum('af_agent_type', ['REPLY', 'CLOSER', 'CONTENT']);
export const afMessageRoleEnum = pgEnum('af_message_role', ['USER', 'ASSISTANT', 'SYSTEM']);

import { users } from './core';

export const afSubscriptions = auraflowSchema.table('af_subscriptions', {
    id: text('id').primaryKey(), // using text for UUIDs generated from code
    userId: integer('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
    plan: afSubscriptionPlanEnum('plan').default('FREE').notNull(),
});

export const afIntegrations = auraflowSchema.table('af_integrations', {
    id: text('id').primaryKey(),
    name: afIntegrationTypeEnum('name').default('INSTAGRAM').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    token: text('token').notNull(),
    instagramId: text('instagram_id').unique(),
    pageId: text('page_id'),
    expiresAt: timestamp('expires_at'),
});

export const afAutomations = auraflowSchema.table('af_automations', {
    id: text('id').primaryKey(),
    name: text('name').default('Untitled').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    active: integer('active').default(0).notNull(), // SQLite style boolean mapping or simple int mapping
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
});

export const afAgents = auraflowSchema.table('af_agents', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    type: afAgentTypeEnum('type').default('REPLY').notNull(),
    prompt: text('prompt').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
});

export const afTriggers = auraflowSchema.table('af_triggers', {
    id: text('id').primaryKey(),
    type: afTriggerTypeEnum('type').notNull(),
    automationId: text('automation_id').notNull().references(() => afAutomations.id, { onDelete: 'cascade' }),
});

export const afListeners = auraflowSchema.table('af_listeners', {
    id: text('id').primaryKey(),
    automationId: text('automation_id').notNull().unique().references(() => afAutomations.id, { onDelete: 'cascade' }),
    listener: afListenerTypeEnum('listener').default('MESSAGE').notNull(),
    commentReply: text('comment_reply'),
    dmReply: text('dm_reply'),
    prompt: text('prompt'),
    agentId: text('agent_id').references(() => afAgents.id),
});

export const afKeywords = auraflowSchema.table('af_keywords', {
    id: text('id').primaryKey(),
    word: text('word').notNull(),
    automationId: text('automation_id').references(() => afAutomations.id, { onDelete: 'cascade' }),
});

export const afPosts = auraflowSchema.table('af_posts', {
    id: text('id').primaryKey(),
    postid: text('postid').notNull(),
    caption: text('caption'),
    media: text('media'),
    mediaType: text('media_type'),
    automationId: text('automation_id').references(() => afAutomations.id, { onDelete: 'cascade' }),
});

export const afConversations = auraflowSchema.table('af_conversations', {
    id: text('id').primaryKey(),
    createdAt: timestamp('created_at').defaultNow(),
    recipientId: text('recipient_id').notNull(),
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
});

export const afMessages = auraflowSchema.table('af_messages', {
    id: text('id').primaryKey(),
    conversationId: text('conversation_id').notNull().references(() => afConversations.id, { onDelete: 'cascade' }),
    role: afMessageRoleEnum('role').notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    inputTokens: integer('input_tokens'),
    outputTokens: integer('output_tokens'),
});

export const afAutomationsRelations = relations(afAutomations, ({ many }) => ({
    triggers: many(afTriggers),
    listeners: many(afListeners),
    keywords: many(afKeywords),
    posts: many(afPosts),
}));

export const afTriggersRelations = relations(afTriggers, ({ one }) => ({
    automation: one(afAutomations, {
        fields: [afTriggers.automationId],
        references: [afAutomations.id],
    }),
}));

export const afListenersRelations = relations(afListeners, ({ one }) => ({
    automation: one(afAutomations, {
        fields: [afListeners.automationId],
        references: [afAutomations.id],
    }),
}));

export const afKeywordsRelations = relations(afKeywords, ({ one }) => ({
    automation: one(afAutomations, {
        fields: [afKeywords.automationId],
        references: [afAutomations.id],
    }),
}));

export const afPostsRelations = relations(afPosts, ({ one }) => ({
    automation: one(afAutomations, {
        fields: [afPosts.automationId],
        references: [afAutomations.id],
    }),
}));
