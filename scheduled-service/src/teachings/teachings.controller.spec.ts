import { Test, TestingModule } from '@nestjs/testing';
import { TeachingsController } from './teachings.controller';
import { TeachingsService } from './teachings.service';

describe('TeachingsController', () => {
  let controller: TeachingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeachingsController],
      providers: [TeachingsService],
    }).compile();

    controller = module.get<TeachingsController>(TeachingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
