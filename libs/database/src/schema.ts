import { pgSchema, pgTable, serial, text, timestamp, integer, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const mailtrackerSchema = pgSchema('mailtracker');
export const instadmSchema = pgSchema('instadm');
export const emsSchema = pgSchema('ems');

export const emsRoleEnum = pgEnum('ems_role', ['intern', 'team_leader', 'manager', 'cto', 'cfo', 'coo', 'ceo', 'admin']);

export const emsUsers = emsSchema.table('ems_users', {
    id: serial('id').primaryKey(),
    email: text('email').unique().notNull(),
    password: text('password').notNull(),
    role: emsRoleEnum('role').default('intern').notNull(),
    department: text('department'), // Can be null for CEO/Admin
    createdAt: timestamp('created_at').defaultNow(),
});

export const emsSessions = emsSchema.table('ems_sessions', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => emsUsers.id),
    loginTime: timestamp('login_time').defaultNow(),
    logoutTime: timestamp('logout_time'),
    activeDurationMinutes: integer('active_duration_minutes').default(0),
});

export const emsPageActivities = emsSchema.table('ems_page_activities', {
    id: serial('id').primaryKey(),
    sessionId: integer('session_id').notNull().references(() => emsSessions.id),
    userId: integer('user_id').notNull().references(() => emsUsers.id),
    route: text('route').notNull(),
    timeSpentSeconds: integer('time_spent_seconds').default(0),
    idleTimeSeconds: integer('idle_time_seconds').default(0),
    createdAt: timestamp('created_at').defaultNow(),
});

export const emsTasksStatusEnum = pgEnum('ems_task_status', ['pending', 'in_progress', 'submitted', 'approved', 'rejected']);

export const emsTasks = emsSchema.table('ems_tasks', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    status: emsTasksStatusEnum('status').default('pending').notNull(),
    assignedToId: integer('assigned_to_id').notNull().references(() => emsUsers.id), // Intern ID
    assignedById: integer('assigned_by_id').notNull().references(() => emsUsers.id), // TL or Manager ID
    createdAt: timestamp('created_at').defaultNow(),
    dueDate: timestamp('due_date'),
});

export const emsSubmissions = emsSchema.table('ems_submissions', {
    id: serial('id').primaryKey(),
    taskId: integer('task_id').notNull().references(() => emsTasks.id),
    userId: integer('user_id').notNull().references(() => emsUsers.id),
    contentUrl: text('content_url'),
    externalLink: text('external_link'),
    notes: text('notes'),
    version: integer('version').default(1).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export const emsSheets = emsSchema.table('ems_sheets', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    ownerId: integer('owner_id').notNull().references(() => emsUsers.id),
    department: text('department'),
    createdAt: timestamp('created_at').defaultNow(),
});

export const emsSheetColumns = emsSchema.table('ems_sheet_columns', {
    id: serial('id').primaryKey(),
    sheetId: integer('sheet_id').notNull().references(() => emsSheets.id),
    name: text('name').notNull(),
    type: text('type').notNull(), // 'text', 'number', 'boolean', 'date' etc
    orderIndex: integer('order_index').notNull(),
});

export const emsMeetingStatusEnum = pgEnum('ems_meeting_status', ['scheduled', 'ongoing', 'completed', 'cancelled']);

export const emsMeetings = emsSchema.table('ems_meetings', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    hostId: integer('host_id').notNull().references(() => emsUsers.id),
    department: text('department'), // E.g., meeting for a specific department
    scheduledTime: timestamp('scheduled_time').notNull(),
    status: emsMeetingStatusEnum('status').default('scheduled').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export const emsMeetingAttendees = emsSchema.table('ems_meeting_attendees', {
    id: serial('id').primaryKey(),
    meetingId: integer('meeting_id').notNull().references(() => emsMeetings.id),
    userId: integer('user_id').notNull().references(() => emsUsers.id),
    joinedAt: timestamp('joined_at'),
    leftAt: timestamp('left_at'),
});

export const emsSheetRows = emsSchema.table('ems_sheet_rows', {
    id: serial('id').primaryKey(),
    sheetId: integer('sheet_id').notNull().references(() => emsSheets.id),
    data: text('data').notNull(), // JSON string representing the row values mapped to column ids
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const roleEnum = pgEnum('role', ['user', 'admin', 'superadmin']);

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: text('email').unique().notNull(),
    password: text('password').notNull(),
    role: roleEnum('role').default('user').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export const sessions = pgTable('sessions', {
    id: serial('id').primaryKey(),
    token: text('token').unique().notNull(),
    userId: integer('user_id').notNull().references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
});

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

export const blogs = pgTable('blogs', {
    id: serial('id').primaryKey(),
    saas: text('saas').notNull(),
    tag: text('tag').notNull(),
    title: text('title').notNull(),
    slug: text('slug').notNull(),
    excerpt: text('excerpt').notNull(),
    content: text('content').notNull(),
    featured: text('featured').notNull().default('false'),
    authorId: integer('author_id').notNull().references(() => users.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const saasProducts = pgTable('saas_products', {
    id: serial('id').primaryKey(),
    saasId: text('saas_id').notNull().unique(), // The id used as slug in frontend
    icon: text('icon'),
    name: text('name').notNull(),
    tag: text('tag').notNull(),
    description: text('description').notNull(),
    domain: text('domain').notNull(),
    status: text('status').notNull(), // 'Live' | 'Beta' | 'Soon'
    featured: text('featured').notNull().default('false'),
    price: integer('price').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
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

export const blogsRelations = relations(blogs, ({ one }) => ({
    author: one(users, {
        fields: [blogs.authorId],
        references: [users.id],
    }),
}));
