import { Module } from '@nestjs/common';
import { SaasProductsController } from './saas-products.controller';
import { SaasProductsService } from './saas-products.service';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [SaasProductsController],
  providers: [SaasProductsService]
})
export class SaasProductsModule { }
