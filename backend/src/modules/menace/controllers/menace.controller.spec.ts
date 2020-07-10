import { Test, TestingModule } from '@nestjs/testing';
import { MenaceController } from './menace.controller';

describe('Menace Controller', () => {
  let controller: MenaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenaceController],
    }).compile();

    controller = module.get<MenaceController>(MenaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
