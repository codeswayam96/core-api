import { Controller, Get } from '@nestjs/common';
import { EmsApiService } from './ems-api.service';

@Controller()
export class EmsApiController {
  constructor(private readonly emsApiService: EmsApiService) {}

  @Get()
  getHello(): string {
    return this.emsApiService.getHello();
  }
}
