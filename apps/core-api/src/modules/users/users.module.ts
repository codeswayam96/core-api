import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SharedModule } from '../../shared/shared.module';
import { UsersController } from './users.controller';

@Module({
    imports: [SharedModule],
    providers: [UsersService],
    exports: [UsersService],
    controllers: [UsersController],
})
export class UsersModule { }
