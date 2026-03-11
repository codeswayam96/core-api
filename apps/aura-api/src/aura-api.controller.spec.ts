import { Test, TestingModule } from '@nestjs/testing';
import { AuraApiController } from './aura-api.controller';
import { AuraApiService } from './aura-api.service';

describe('AuraApiController', () => {
  let auraApiController: AuraApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuraApiController],
      providers: [AuraApiService],
    }).compile();

    auraApiController = app.get<AuraApiController>(AuraApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(auraApiController.getHello()).toBe('Hello World!');
    });
  });
});
