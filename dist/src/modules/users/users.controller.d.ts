import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: any): Promise<{
        password: string;
        id: number;
        email: string;
        createdAt: Date;
    }>;
}
