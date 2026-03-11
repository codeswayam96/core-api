CREATE SCHEMA "auraflow";
--> statement-breakpoint
CREATE SCHEMA "ems";
--> statement-breakpoint
CREATE TYPE "public"."af_agent_type" AS ENUM('REPLY', 'CLOSER', 'CONTENT');--> statement-breakpoint
CREATE TYPE "public"."af_integration_type" AS ENUM('INSTAGRAM');--> statement-breakpoint
CREATE TYPE "public"."af_listener_type" AS ENUM('SMART_AI', 'MESSAGE');--> statement-breakpoint
CREATE TYPE "public"."af_message_role" AS ENUM('USER', 'ASSISTANT', 'SYSTEM');--> statement-breakpoint
CREATE TYPE "public"."af_subscription_plan" AS ENUM('FREE', 'PRO');--> statement-breakpoint
CREATE TYPE "public"."af_trigger_type" AS ENUM('DM', 'COMMENT');--> statement-breakpoint
CREATE TYPE "public"."ems_meeting_status" AS ENUM('scheduled', 'ongoing', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."ems_role" AS ENUM('intern', 'team_leader', 'manager', 'cto', 'cfo', 'coo', 'ceo', 'admin');--> statement-breakpoint
CREATE TYPE "public"."ems_task_status" AS ENUM('pending', 'in_progress', 'submitted', 'approved', 'rejected');--> statement-breakpoint
CREATE TABLE "auraflow"."af_agents" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" "af_agent_type" DEFAULT 'REPLY' NOT NULL,
	"prompt" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auraflow"."af_automations" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text DEFAULT 'Untitled' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"active" integer DEFAULT 0 NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auraflow"."af_conversations" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"recipient_id" text NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auraflow"."af_integrations" (
	"id" text PRIMARY KEY NOT NULL,
	"name" "af_integration_type" DEFAULT 'INSTAGRAM' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"user_id" integer NOT NULL,
	"token" text NOT NULL,
	"instagram_id" text,
	"page_id" text,
	"expires_at" timestamp,
	CONSTRAINT "af_integrations_instagram_id_unique" UNIQUE("instagram_id")
);
--> statement-breakpoint
CREATE TABLE "auraflow"."af_keywords" (
	"id" text PRIMARY KEY NOT NULL,
	"word" text NOT NULL,
	"automation_id" text
);
--> statement-breakpoint
CREATE TABLE "auraflow"."af_listeners" (
	"id" text PRIMARY KEY NOT NULL,
	"automation_id" text NOT NULL,
	"listener" "af_listener_type" DEFAULT 'MESSAGE' NOT NULL,
	"comment_reply" text,
	"dm_reply" text,
	"prompt" text,
	"agent_id" text,
	CONSTRAINT "af_listeners_automation_id_unique" UNIQUE("automation_id")
);
--> statement-breakpoint
CREATE TABLE "auraflow"."af_messages" (
	"id" text PRIMARY KEY NOT NULL,
	"conversation_id" text NOT NULL,
	"role" "af_message_role" NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"input_tokens" integer,
	"output_tokens" integer
);
--> statement-breakpoint
CREATE TABLE "auraflow"."af_posts" (
	"id" text PRIMARY KEY NOT NULL,
	"postid" text NOT NULL,
	"caption" text,
	"media" text,
	"media_type" text,
	"automation_id" text
);
--> statement-breakpoint
CREATE TABLE "auraflow"."af_subscriptions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"plan" "af_subscription_plan" DEFAULT 'FREE' NOT NULL,
	CONSTRAINT "af_subscriptions_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "auraflow"."af_triggers" (
	"id" text PRIMARY KEY NOT NULL,
	"type" "af_trigger_type" NOT NULL,
	"automation_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ems"."ems_meeting_attendees" (
	"id" serial PRIMARY KEY NOT NULL,
	"meeting_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"joined_at" timestamp,
	"left_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "ems"."ems_meetings" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"host_id" integer NOT NULL,
	"department" text,
	"scheduled_time" timestamp NOT NULL,
	"status" "ems_meeting_status" DEFAULT 'scheduled' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "ems"."ems_page_activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"route" text NOT NULL,
	"time_spent_seconds" integer DEFAULT 0,
	"idle_time_seconds" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "ems"."ems_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"login_time" timestamp DEFAULT now(),
	"logout_time" timestamp,
	"active_duration_minutes" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "ems"."ems_sheet_columns" (
	"id" serial PRIMARY KEY NOT NULL,
	"sheet_id" integer NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"order_index" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ems"."ems_sheet_rows" (
	"id" serial PRIMARY KEY NOT NULL,
	"sheet_id" integer NOT NULL,
	"data" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "ems"."ems_sheets" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"owner_id" integer NOT NULL,
	"department" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "ems"."ems_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"task_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"content_url" text,
	"external_link" text,
	"notes" text,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "ems"."ems_tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" "ems_task_status" DEFAULT 'pending' NOT NULL,
	"assigned_to_id" integer NOT NULL,
	"assigned_by_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"due_date" timestamp
);
--> statement-breakpoint
CREATE TABLE "ems"."ems_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" "ems_role" DEFAULT 'intern' NOT NULL,
	"department" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "ems_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "saas_products" ALTER COLUMN "price" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "saas" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "tag" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "excerpt" text NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "featured" text DEFAULT 'false' NOT NULL;--> statement-breakpoint
ALTER TABLE "saas_products" ADD COLUMN "saas_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "saas_products" ADD COLUMN "icon" text;--> statement-breakpoint
ALTER TABLE "saas_products" ADD COLUMN "tag" text NOT NULL;--> statement-breakpoint
ALTER TABLE "saas_products" ADD COLUMN "domain" text NOT NULL;--> statement-breakpoint
ALTER TABLE "saas_products" ADD COLUMN "status" text NOT NULL;--> statement-breakpoint
ALTER TABLE "saas_products" ADD COLUMN "featured" text DEFAULT 'false' NOT NULL;--> statement-breakpoint
ALTER TABLE "auraflow"."af_agents" ADD CONSTRAINT "af_agents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auraflow"."af_automations" ADD CONSTRAINT "af_automations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auraflow"."af_conversations" ADD CONSTRAINT "af_conversations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auraflow"."af_integrations" ADD CONSTRAINT "af_integrations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auraflow"."af_keywords" ADD CONSTRAINT "af_keywords_automation_id_af_automations_id_fk" FOREIGN KEY ("automation_id") REFERENCES "auraflow"."af_automations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auraflow"."af_listeners" ADD CONSTRAINT "af_listeners_automation_id_af_automations_id_fk" FOREIGN KEY ("automation_id") REFERENCES "auraflow"."af_automations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auraflow"."af_listeners" ADD CONSTRAINT "af_listeners_agent_id_af_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "auraflow"."af_agents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auraflow"."af_messages" ADD CONSTRAINT "af_messages_conversation_id_af_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "auraflow"."af_conversations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auraflow"."af_posts" ADD CONSTRAINT "af_posts_automation_id_af_automations_id_fk" FOREIGN KEY ("automation_id") REFERENCES "auraflow"."af_automations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auraflow"."af_subscriptions" ADD CONSTRAINT "af_subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auraflow"."af_triggers" ADD CONSTRAINT "af_triggers_automation_id_af_automations_id_fk" FOREIGN KEY ("automation_id") REFERENCES "auraflow"."af_automations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ems"."ems_meeting_attendees" ADD CONSTRAINT "ems_meeting_attendees_meeting_id_ems_meetings_id_fk" FOREIGN KEY ("meeting_id") REFERENCES "ems"."ems_meetings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ems"."ems_meeting_attendees" ADD CONSTRAINT "ems_meeting_attendees_user_id_ems_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "ems"."ems_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ems"."ems_meetings" ADD CONSTRAINT "ems_meetings_host_id_ems_users_id_fk" FOREIGN KEY ("host_id") REFERENCES "ems"."ems_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ems"."ems_page_activities" ADD CONSTRAINT "ems_page_activities_session_id_ems_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "ems"."ems_sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ems"."ems_page_activities" ADD CONSTRAINT "ems_page_activities_user_id_ems_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "ems"."ems_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ems"."ems_sessions" ADD CONSTRAINT "ems_sessions_user_id_ems_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "ems"."ems_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ems"."ems_sheet_columns" ADD CONSTRAINT "ems_sheet_columns_sheet_id_ems_sheets_id_fk" FOREIGN KEY ("sheet_id") REFERENCES "ems"."ems_sheets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ems"."ems_sheet_rows" ADD CONSTRAINT "ems_sheet_rows_sheet_id_ems_sheets_id_fk" FOREIGN KEY ("sheet_id") REFERENCES "ems"."ems_sheets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ems"."ems_sheets" ADD CONSTRAINT "ems_sheets_owner_id_ems_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "ems"."ems_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ems"."ems_submissions" ADD CONSTRAINT "ems_submissions_task_id_ems_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "ems"."ems_tasks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ems"."ems_submissions" ADD CONSTRAINT "ems_submissions_user_id_ems_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "ems"."ems_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ems"."ems_tasks" ADD CONSTRAINT "ems_tasks_assigned_to_id_ems_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "ems"."ems_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ems"."ems_tasks" ADD CONSTRAINT "ems_tasks_assigned_by_id_ems_users_id_fk" FOREIGN KEY ("assigned_by_id") REFERENCES "ems"."ems_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saas_products" ADD CONSTRAINT "saas_products_saas_id_unique" UNIQUE("saas_id");