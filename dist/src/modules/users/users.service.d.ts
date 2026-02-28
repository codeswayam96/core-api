import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../shared/drizzle/schema';
export declare class UsersService {
    private db;
    constructor(db: NodePgDatabase<typeof schema>);
    findOne(email: string): Promise<{
        password: string;
        id: number;
        email: string;
        createdAt: Date;
    }>;
    create(data: {
        email: string;
        password: string;
    }): Promise<{
        password: string;
        id: number;
        email: string;
        createdAt: Date;
    }>;
}
