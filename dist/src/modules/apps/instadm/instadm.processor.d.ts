import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
export declare class InstadmProcessor extends WorkerHost {
    process(job: Job<any, any, string>): Promise<any>;
}
