import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuraApiService } from './aura-api.service';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';

@Controller()
export class AuraApiController {
  constructor(private readonly auraApiService: AuraApiService) { }

  @Get()
  getHello(): string {
    return this.auraApiService.getHello();
  }

  @Get('user/profile')
  @UseGuards(JwtAuthGuard)
  async getUserProfile(@Req() req) {
    return this.auraApiService.getUserProfile(req.user.userId);
  }
}
