import { Module, Global } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export const DRIZZLE_DB = 'DRIZZLE_DB_CONNECTION';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: DRIZZLE_DB,
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const connectionString = configService.get<string>('DATABASE_URL');
                const pool = new Pool({
                    connectionString,
                });
                return drizzle(pool, { schema });
            },
        },
    ],
    exports: [DRIZZLE_DB],
})
export class DrizzleModule { }
