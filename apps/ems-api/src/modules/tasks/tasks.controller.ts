import { Controller, Post, Get, Body, Param, UseGuards, Request, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    @Roles('manager', 'team_leader', 'cto', 'cfo', 'coo', 'ceo', 'admin')
    async createTask(@Body() body: any) {
        return this.tasksService.createTask(body);
    }

    @Get('my-tasks')
    async getMyTasks(@Request() req) {
        return this.tasksService.getTasksByAssignee(req.user.id);
    }

    @Get(':id')
    async getTask(@Param('id') id: string) {
        return this.tasksService.getTaskById(Number(id));
    }

    @Post(':id/submissions')
    @Roles('intern', 'team_leader') // Only assignees should submit
    async submitTask(@Param('id') id: string, @Body() body: any) {
        return this.tasksService.submitTask(Number(id), body);
    }

    @Get(':id/submissions')
    async getSubmissions(@Param('id') id: string) {
        return this.tasksService.getSubmissions(Number(id));
    }

    @Patch(':id/review')
    @Roles('manager', 'team_leader', 'cto', 'admin')
    async reviewTask(
        @Param('id') id: string,
        @Body('status') status: 'approved' | 'rejected',
        @Request() req
    ) {
        return this.tasksService.updateTaskStatus(Number(id), status, req.user.id);
    }
}
