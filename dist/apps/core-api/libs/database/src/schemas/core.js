"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionsRelations = exports.usersRelations = exports.sessions = exports.users = exports.appSettings = exports.roleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const misc_1 = require("./misc");
const misc_2 = require("./misc");
const marketing_1 = require("./marketing");
exports.roleEnum = (0, pg_core_1.pgEnum)('role', ['user', 'admin', 'superadmin', 'editor', 'viewer', 'subscriber']);
exports.appSettings = (0, pg_core_1.pgTable)('app_settings', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    authType: (0, pg_core_1.text)('auth_type').default('clerk').notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    clerkId: (0, pg_core_1.text)('clerk_id').unique(),
    googleId: (0, pg_core_1.text)('google_id').unique(),
    name: (0, pg_core_1.text)('name'),
    email: (0, pg_core_1.text)('email').unique().notNull(),
    password: (0, pg_core_1.text)('password'),
    role: (0, exports.roleEnum)('role').default('user').notNull(),
    status: (0, pg_core_1.text)('status').default('active').notNull(),
    lastActiveAt: (0, pg_core_1.timestamp)('last_active_at'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
exports.sessions = (0, pg_core_1.pgTable)('sessions', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    token: (0, pg_core_1.text)('token').unique().notNull(),
    userId: (0, pg_core_1.integer)('user_id').notNull().references(() => exports.users.id),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many }) => ({
    sessions: many(exports.sessions),
    trackingLogs: many(misc_1.trackingLogs),
    autoReplies: many(misc_2.autoReplies),
    blogs: many(marketing_1.blogs),
}));
exports.sessionsRelations = (0, drizzle_orm_1.relations)(exports.sessions, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.sessions.userId],
        references: [exports.users.id],
    }),
}));
//# sourceMappingURL=core.js.map