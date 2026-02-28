import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Request } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';

@Controller('blogs')
export class BlogsController {
    constructor(private readonly blogsService: BlogsService) { }

    @Get()
    findAll() {
        return this.blogsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.blogsService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'superadmin')
    create(@Request() req, @Body() createBlogDto: { saas: string; tag: string; title: string; slug: string; excerpt: string; content: string; featured?: string }) {
        return this.blogsService.create({
            ...createBlogDto,
            authorId: req.user.userId,
        });
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'superadmin')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateBlogDto: { saas?: string; tag?: string; title?: string; slug?: string; excerpt?: string; content?: string; featured?: string }) {
        return this.blogsService.update(id, updateBlogDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'superadmin')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.blogsService.remove(id);
    }
}
