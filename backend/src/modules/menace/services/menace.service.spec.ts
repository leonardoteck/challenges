import { Test, TestingModule } from '@nestjs/testing';
import { MenaceService } from './menace.service';

describe('MenaceService', () => {
  let service: MenaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenaceService],
    }).compile();

    service = module.get<MenaceService>(MenaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
