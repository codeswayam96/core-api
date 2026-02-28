import { Module } from '@nestjs/common';
import { DrizzleModule } from '@shared/database';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule, DrizzleModule],
    exports: [DrizzleModule],
})
export class SharedModule { }
