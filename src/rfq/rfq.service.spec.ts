import { Test, TestingModule } from '@nestjs/testing';
import { FrqService } from './rfq.service';

describe('FrqService', () => {
  let service: FrqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FrqService],
    }).compile();

    service = module.get<FrqService>(FrqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
