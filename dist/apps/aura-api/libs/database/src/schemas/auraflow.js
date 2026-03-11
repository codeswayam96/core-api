"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.afPostsRelations = exports.afKeywordsRelations = exports.afListenersRelations = exports.afTriggersRelations = exports.afAutomationsRelations = exports.afMessages = exports.afConversations = exports.afPosts = exports.afKeywords = exports.afListeners = exports.afTriggers = exports.afAgents = exports.afAutomations = exports.afIntegrations = exports.afSubscriptions = exports.afMessageRoleEnum = exports.afAgentTypeEnum = exports.afListenerTypeEnum = exports.afTriggerTypeEnum = exports.afIntegrationTypeEnum = exports.afSubscriptionPlanEnum = exports.auraflowSchema = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.auraflowSchema = (0, pg_core_1.pgSchema)('auraflow');
exports.afSubscriptionPlanEnum = (0, pg_core_1.pgEnum)('af_subscription_plan', ['FREE', 'PRO']);
exports.afIntegrationTypeEnum = (0, pg_core_1.pgEnum)('af_integration_type', ['INSTAGRAM']);
exports.afTriggerTypeEnum = (0, pg_core_1.pgEnum)('af_trigger_type', ['DM', 'COMMENT']);
exports.afListenerTypeEnum = (0, pg_core_1.pgEnum)('af_listener_type', ['SMART_AI', 'MESSAGE']);
exports.afAgentTypeEnum = (0, pg_core_1.pgEnum)('af_agent_type', ['REPLY', 'CLOSER', 'CONTENT']);
exports.afMessageRoleEnum = (0, pg_core_1.pgEnum)('af_message_role', ['USER', 'ASSISTANT', 'SYSTEM']);
const core_1 = require("./core");
exports.afSubscriptions = exports.auraflowSchema.table('af_subscriptions', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    userId: (0, pg_core_1.integer)('user_id').notNull().unique().references(() => core_1.users.id, { onDelete: 'cascade' }),
    plan: (0, exports.afSubscriptionPlanEnum)('plan').default('FREE').notNull(),
});
exports.afIntegrations = exports.auraflowSchema.table('af_integrations', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    name: (0, exports.afIntegrationTypeEnum)('name').default('INSTAGRAM').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    userId: (0, pg_core_1.integer)('user_id').notNull().references(() => core_1.users.id, { onDelete: 'cascade' }),
    token: (0, pg_core_1.text)('token').notNull(),
    instagramId: (0, pg_core_1.text)('instagram_id').unique(),
    pageId: (0, pg_core_1.text)('page_id'),
    expiresAt: (0, pg_core_1.timestamp)('expires_at'),
});
exports.afAutomations = exports.auraflowSchema.table('af_automations', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').default('Untitled').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    active: (0, pg_core_1.integer)('active').default(0).notNull(),
    userId: (0, pg_core_1.integer)('user_id').notNull().references(() => core_1.users.id, { onDelete: 'cascade' }),
});
exports.afAgents = exports.auraflowSchema.table('af_agents', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    type: (0, exports.afAgentTypeEnum)('type').default('REPLY').notNull(),
    prompt: (0, pg_core_1.text)('prompt').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    userId: (0, pg_core_1.integer)('user_id').notNull().references(() => core_1.users.id, { onDelete: 'cascade' }),
});
exports.afTriggers = exports.auraflowSchema.table('af_triggers', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    type: (0, exports.afTriggerTypeEnum)('type').notNull(),
    automationId: (0, pg_core_1.text)('automation_id').notNull().references(() => exports.afAutomations.id, { onDelete: 'cascade' }),
});
exports.afListeners = exports.auraflowSchema.table('af_listeners', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    automationId: (0, pg_core_1.text)('automation_id').notNull().unique().references(() => exports.afAutomations.id, { onDelete: 'cascade' }),
    listener: (0, exports.afListenerTypeEnum)('listener').default('MESSAGE').notNull(),
    commentReply: (0, pg_core_1.text)('comment_reply'),
    dmReply: (0, pg_core_1.text)('dm_reply'),
    prompt: (0, pg_core_1.text)('prompt'),
    agentId: (0, pg_core_1.text)('agent_id').references(() => exports.afAgents.id),
});
exports.afKeywords = exports.auraflowSchema.table('af_keywords', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    word: (0, pg_core_1.text)('word').notNull(),
    automationId: (0, pg_core_1.text)('automation_id').references(() => exports.afAutomations.id, { onDelete: 'cascade' }),
});
exports.afPosts = exports.auraflowSchema.table('af_posts', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    postid: (0, pg_core_1.text)('postid').notNull(),
    caption: (0, pg_core_1.text)('caption'),
    media: (0, pg_core_1.text)('media'),
    mediaType: (0, pg_core_1.text)('media_type'),
    automationId: (0, pg_core_1.text)('automation_id').references(() => exports.afAutomations.id, { onDelete: 'cascade' }),
});
exports.afConversations = exports.auraflowSchema.table('af_conversations', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    recipientId: (0, pg_core_1.text)('recipient_id').notNull(),
    userId: (0, pg_core_1.integer)('user_id').notNull().references(() => core_1.users.id, { onDelete: 'cascade' }),
});
exports.afMessages = exports.auraflowSchema.table('af_messages', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    conversationId: (0, pg_core_1.text)('conversation_id').notNull().references(() => exports.afConversations.id, { onDelete: 'cascade' }),
    role: (0, exports.afMessageRoleEnum)('role').notNull(),
    content: (0, pg_core_1.text)('content').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    inputTokens: (0, pg_core_1.integer)('input_tokens'),
    outputTokens: (0, pg_core_1.integer)('output_tokens'),
});
exports.afAutomationsRelations = (0, drizzle_orm_1.relations)(exports.afAutomations, ({ many }) => ({
    triggers: many(exports.afTriggers),
    listeners: many(exports.afListeners),
    keywords: many(exports.afKeywords),
    posts: many(exports.afPosts),
}));
exports.afTriggersRelations = (0, drizzle_orm_1.relations)(exports.afTriggers, ({ one }) => ({
    automation: one(exports.afAutomations, {
        fields: [exports.afTriggers.automationId],
        references: [exports.afAutomations.id],
    }),
}));
exports.afListenersRelations = (0, drizzle_orm_1.relations)(exports.afListeners, ({ one }) => ({
    automation: one(exports.afAutomations, {
        fields: [exports.afListeners.automationId],
        references: [exports.afAutomations.id],
    }),
}));
exports.afKeywordsRelations = (0, drizzle_orm_1.relations)(exports.afKeywords, ({ one }) => ({
    automation: one(exports.afAutomations, {
        fields: [exports.afKeywords.automationId],
        references: [exports.afAutomations.id],
    }),
}));
exports.afPostsRelations = (0, drizzle_orm_1.relations)(exports.afPosts, ({ one }) => ({
    automation: one(exports.afAutomations, {
        fields: [exports.afPosts.automationId],
        references: [exports.afAutomations.id],
    }),
}));
//# sourceMappingURL=auraflow.js.map