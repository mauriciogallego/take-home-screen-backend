import { Test, TestingModule } from '@nestjs/testing';
import { FrqController } from './rfq.controller';

describe('FrqController', () => {
  let controller: FrqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrqController],
    }).compile();

    controller = module.get<FrqController>(FrqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
