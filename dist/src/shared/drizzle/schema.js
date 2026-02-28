"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoRepliesRelations = exports.trackingLogsRelations = exports.sessionsRelations = exports.usersRelations = exports.autoReplies = exports.trackingLogs = exports.sessions = exports.users = exports.instadmSchema = exports.mailtrackerSchema = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.mailtrackerSchema = (0, pg_core_1.pgSchema)('mailtracker');
exports.instadmSchema = (0, pg_core_1.pgSchema)('instadm');
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    email: (0, pg_core_1.text)('email').unique().notNull(),
    password: (0, pg_core_1.text)('password').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
exports.sessions = (0, pg_core_1.pgTable)('sessions', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    token: (0, pg_core_1.text)('token').unique().notNull(),
    userId: (0, pg_core_1.integer)('user_id').notNull().references(() => exports.users.id),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
exports.trackingLogs = exports.mailtrackerSchema.table('tracking_logs', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    action: (0, pg_core_1.text)('action').notNull(),
    userId: (0, pg_core_1.integer)('user_id').notNull().references(() => exports.users.id),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
exports.autoReplies = exports.instadmSchema.table('auto_replies', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    message: (0, pg_core_1.text)('message').notNull(),
    userId: (0, pg_core_1.integer)('user_id').notNull().references(() => exports.users.id),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many }) => ({
    sessions: many(exports.sessions),
    trackingLogs: many(exports.trackingLogs),
    autoReplies: many(exports.autoReplies),
}));
exports.sessionsRelations = (0, drizzle_orm_1.relations)(exports.sessions, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.sessions.userId],
        references: [exports.users.id],
    }),
}));
exports.trackingLogsRelations = (0, drizzle_orm_1.relations)(exports.trackingLogs, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.trackingLogs.userId],
        references: [exports.users.id],
    }),
}));
exports.autoRepliesRelations = (0, drizzle_orm_1.relations)(exports.autoReplies, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.autoReplies.userId],
        references: [exports.users.id],
    }),
}));
//# sourceMappingURL=schema.js.map