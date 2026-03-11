"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emsSheetRows = exports.emsMeetingAttendees = exports.emsMeetings = exports.emsMeetingStatusEnum = exports.emsSheetColumns = exports.emsSheets = exports.emsSubmissions = exports.emsTasks = exports.emsTasksStatusEnum = exports.emsPageActivities = exports.emsSessions = exports.emsUsers = exports.emsRoleEnum = exports.emsSchema = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
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
//# sourceMappingURL=ems.js.map