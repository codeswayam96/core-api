import { Test, TestingModule } from '@nestjs/testing';
import { EmsApiController } from './ems-api.controller';
import { EmsApiService } from './ems-api.service';

describe('EmsApiController', () => {
  let emsApiController: EmsApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmsApiController],
      providers: [EmsApiService],
    }).compile();

    emsApiController = app.get<EmsApiController>(EmsApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(emsApiController.getHello()).toBe('Hello World!');
    });
  });
});
