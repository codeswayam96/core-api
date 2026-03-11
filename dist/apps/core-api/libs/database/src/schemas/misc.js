"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoRepliesRelations = exports.trackingLogsRelations = exports.autoReplies = exports.trackingLogs = exports.instadmSchema = exports.mailtrackerSchema = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const core_1 = require("./core");
exports.mailtrackerSchema = (0, pg_core_1.pgSchema)('mailtracker');
exports.instadmSchema = (0, pg_core_1.pgSchema)('instadm');
exports.trackingLogs = exports.mailtrackerSchema.table('tracking_logs', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    action: (0, pg_core_1.text)('action').notNull(),
    userId: (0, pg_core_1.integer)('user_id').notNull().references(() => core_1.users.id),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
exports.autoReplies = exports.instadmSchema.table('auto_replies', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    message: (0, pg_core_1.text)('message').notNull(),
    userId: (0, pg_core_1.integer)('user_id').notNull().references(() => core_1.users.id),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
exports.trackingLogsRelations = (0, drizzle_orm_1.relations)(exports.trackingLogs, ({ one }) => ({
    user: one(core_1.users, {
        fields: [exports.trackingLogs.userId],
        references: [core_1.users.id],
    }),
}));
exports.autoRepliesRelations = (0, drizzle_orm_1.relations)(exports.autoReplies, ({ one }) => ({
    user: one(core_1.users, {
        fields: [exports.autoReplies.userId],
        references: [core_1.users.id],
    }),
}));
//# sourceMappingURL=misc.js.map