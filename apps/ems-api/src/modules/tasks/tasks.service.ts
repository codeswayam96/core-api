import { Injectable, Inject } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE_DB } from '@core/database/database.module';
import * as schema from '@core/database';

@Injectable()
export class TasksService {
    constructor(
        @Inject(DRIZZLE_DB) private conn: NodePgDatabase<typeof schema>,
    ) { }

    async createTask(data: any) {
        const result = await this.conn.insert(schema.emsTasks).values(data).returning();
        return result[0];
    }

    async getTasksByAssignee(assigneeId: number) {
        return this.conn.select().from(schema.emsTasks).where(eq(schema.emsTasks.assignedToId, assigneeId));
    }

    async getTasksByDepartment(departmentId: number) {
        // Basic implementation; ideally join with users to filter by department
        return this.conn.select().from(schema.emsTasks);
    }

    async getTaskById(taskId: number) {
        const result = await this.conn.select().from(schema.emsTasks).where(eq(schema.emsTasks.id, taskId)).limit(1);
        return result[0];
    }

    async updateTaskStatus(taskId: number, status: 'pending' | 'in_progress' | 'submitted' | 'approved' | 'rejected', reviewerId?: number) {
        const updateData: any = { status };
        if (reviewerId) updateData.reviewerId = reviewerId;

        const result = await this.conn.update(schema.emsTasks)
            .set(updateData)
            .where(eq(schema.emsTasks.id, taskId))
            .returning();
        return result[0];
    }

    async submitTask(taskId: number, data: any) {
        // 1. Create a submission
        const submission = await this.conn.insert(schema.emsSubmissions).values({
            taskId,
            ...data,
        }).returning();

        // 2. Change Task Status to 'submitted'
        await this.updateTaskStatus(taskId, 'submitted');

        return submission[0];
    }

    async getSubmissions(taskId: number) {
        return this.conn.select().from(schema.emsSubmissions).where(eq(schema.emsSubmissions.taskId, taskId));
    }
}
