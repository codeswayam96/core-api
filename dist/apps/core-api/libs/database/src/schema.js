"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRelations = exports.autoRepliesRelations = exports.trackingLogsRelations = exports.sessionsRelations = exports.usersRelations = exports.saasProducts = exports.blogs = exports.autoReplies = exports.trackingLogs = exports.sessions = exports.users = exports.roleEnum = exports.emsSheetRows = exports.emsMeetingAttendees = exports.emsMeetings = exports.emsMeetingStatusEnum = exports.emsSheetColumns = exports.emsSheets = exports.emsSubmissions = exports.emsTasks = exports.emsTasksStatusEnum = exports.emsPageActivities = exports.emsSessions = exports.emsUsers = exports.emsRoleEnum = exports.emsSchema = exports.instadmSchema = exports.mailtrackerSchema = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.mailtrackerSchema = (0, pg_core_1.pgSchema)('mailtracker');
exports.instadmSchema = (0, pg_core_1.pgSchema)('instadm');
exports.emsSchema = (0, pg_core_1.pgSchema)('ems');
exports.emsRoleEnum = (0, pg_core_1.pgEnum)('ems_role', ['intern', 'team_leader', 'manager', 'cto', 'cfo', 'coo', 'ceo', 'admin']);
exports.emsUsers = exports.emsSchema.table('ems_users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    email: (0, pg_core_1.text)('email').unique().notNull(),
    password: (0, pg_core_1.text)('password').notNull(),
    role: (0, exports.emsRoleEnum)('role').default('intern').notNull(),
    department: (0, pg_core_1.text)('department'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
exports.emsSessions = exports.emsSchema.table('ems_sessions', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    userId: (0, pg_core_1.integer)('user_id').notNull().references(() => exports.emsUsers.id),
    loginTime: (0, pg_core_1.timestamp)('login_time').defaultNow(),
    logoutTime: (0, pg_core_1.timestamp)('logout_time'),
    activeDurationMinutes: (0, pg_core_1.integer)('active_duration_minutes').default(0),
});
exports.emsPageActivities = exports.emsSchema.table('ems_page_activities', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    sessionId: (0, pg_core_1.integer)('session_id').notNull().references(() => exports.emsSessions.id),
    userId: (0, pg_core_1.integer)('user_id').notNull().references(() => exports.emsUsers.id),
    route: (0, pg_core_1.text)('route').notNull(),
    timeSpentSeconds: (0, pg_core_1.integer)('time_spent_seconds').default(0),
    idleTimeSeconds: (0, pg_core_1.integer)('idle_time_seconds').default(0),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
exports.emsTasksStatusEnum = (0, pg_core_1.pgEnum)('ems_task_status', ['pending', 'in_progress', 'submitted', 'approved', 'rejected']);
exports.emsTasks = exports.emsSchema.table('ems_tasks', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    title: (0, pg_core_1.text)('title').notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
    status: (0, exports.emsTasksStatusEnum)('status').default('pending').notNull(),
    assignedToId: (0, pg_core_1.integer)('assigned_to_id').notNull().references(() => exports.emsUsers.id),
    assignedById: (0, pg_core_1.integer)('assigned_by_id').notNull().references(() => exports.emsUsers.id),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    dueDate: (0, pg_core_1.timestamp)('due_date'),
});
exports.emsSubmissions = exports.emsSchema.table('ems_submissions', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    taskId: (0, pg_core_1.integer)('task_id').notNull().references(() => exports.emsTasks.id),
    userId: (0, pg_core_1.integer)('user_id').notNull().references(() => exports.emsUsers.id),
    contentUrl: (0, pg_core_1.text)('content_url'),
    externalLink: (0, pg_core_1.text)('external_link'),
    notes: (0, pg_core_1.text)('notes'),
    version: (0, pg_core_1.integer)('version').default(1).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
exports.emsSheets = exports.emsSchema.table('ems_sheets', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    ownerId: (0, pg_core_1.integer)('owner_id').notNull().references(() => exports.emsUsers.id),
    department: (0, pg_core_1.text)('department'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
exports.emsSheetColumns = exports.emsSchema.table('ems_sheet_columns', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    sheetId: (0, pg_core_1.integer)('sheet_id').notNull().references(() => exports.emsSheets.id),
    name: (0, pg_core_1.text)('name').notNull(),
    type: (0, pg_core_1.text)('type').notNull(),
    orderIndex: (0, pg_core_1.integer)('order_index').notNull(),
});
exports.emsMeetingStatusEnum = (0, pg_core_1.pgEnum)('ems_meeting_status', ['scheduled', 'ongoing', 'completed', 'cancelled']);
exports.emsMeetings = exports.emsSchema.table('ems_meetings', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    title: (0, pg_core_1.text)('title').notNull(),
    hostId: (0, pg_core_1.integer)('host_id').notNull().references(() => exports.emsUsers.id),
    department: (0, pg_core_1.text)('department'),
    scheduledTime: (0, pg_core_1.timestamp)('scheduled_time').notNull(),
    status: (0, exports.emsMeetingStatusEnum)('status').default('scheduled').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
exports.emsMeetingAttendees = exports.emsSchema.table('ems_meeting_attendees', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    meetingId: (0, pg_core_1.integer)('meeting_id').notNull().references(() => exports.emsMeetings.id),
    userId: (0, pg_core_1.integer)('user_id').notNull().references(() => exports.emsUsers.id),
    joinedAt: (0, pg_core_1.timestamp)('joined_at'),
    leftAt: (0, pg_core_1.timestamp)('left_at'),
});
exports.emsSheetRows = exports.emsSchema.table('ems_sheet_rows', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    sheetId: (0, pg_core_1.integer)('sheet_id').notNull().references(() => exports.emsSheets.id),
    data: (0, pg_core_1.text)('data').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
exports.roleEnum = (0, pg_core_1.pgEnum)('role', ['user', 'admin', 'superadmin']);
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    email: (0, pg_core_1.text)('email').unique().notNull(),
    password: (0, pg_core_1.text)('password').notNull(),
    role: (0, exports.roleEnum)('role').default('user').notNull(),
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
exports.blogs = (0, pg_core_1.pgTable)('blogs', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    saas: (0, pg_core_1.text)('saas').notNull(),
    tag: (0, pg_core_1.text)('tag').notNull(),
    title: (0, pg_core_1.text)('title').notNull(),
    slug: (0, pg_core_1.text)('slug').notNull(),
    excerpt: (0, pg_core_1.text)('excerpt').notNull(),
    content: (0, pg_core_1.text)('content').notNull(),
    featured: (0, pg_core_1.text)('featured').notNull().default('false'),
    authorId: (0, pg_core_1.integer)('author_id').notNull().references(() => exports.users.id),
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
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many }) => ({
    sessions: many(exports.sessions),
    trackingLogs: many(exports.trackingLogs),
    autoReplies: many(exports.autoReplies),
    blogs: many(exports.blogs),
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
exports.blogsRelations = (0, drizzle_orm_1.relations)(exports.blogs, ({ one }) => ({
    author: one(exports.users, {
        fields: [exports.blogs.authorId],
        references: [exports.users.id],
    }),
}));
//# sourceMappingURL=schema.js.map