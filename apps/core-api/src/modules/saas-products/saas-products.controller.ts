import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { SaasProductsService } from './saas-products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../../shared/guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';

@Controller('saas-products')
export class SaasProductsController {
    constructor(private readonly saasProductsService: SaasProductsService) { }

    @Get()
    findAll() {
        return this.saasProductsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.saasProductsService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'superadmin')
    create(@Body() createSaasProductDto: { saasId: string; icon?: string; name: string; tag: string; description: string; domain: string; status: string; featured?: string; price?: number }) {
        return this.saasProductsService.create(createSaasProductDto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'superadmin')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateSaasProductDto: { saasId?: string; icon?: string; name?: string; tag?: string; description?: string; domain?: string; status?: string; featured?: string; price?: number }) {
        return this.saasProductsService.update(id, updateSaasProductDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin', 'superadmin')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.saasProductsService.remove(id);
    }
}
