import { Queue } from 'bullmq';
export declare class InstadmService {
    private instadmQueue;
    constructor(instadmQueue: Queue);
    triggerTask(data: any): Promise<{
        message: string;
        jobId: string;
    }>;
}
