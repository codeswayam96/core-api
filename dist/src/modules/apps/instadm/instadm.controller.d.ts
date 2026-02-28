import { InstadmService } from './instadm.service';
export declare class InstadmController {
    private readonly instadmService;
    constructor(instadmService: InstadmService);
    createJob(body: any): Promise<{
        message: string;
        jobId: string;
    }>;
}
