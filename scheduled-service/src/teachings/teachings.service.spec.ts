import { Test, TestingModule } from '@nestjs/testing';
import { TeachingsService } from './teachings.service';

describe('TeachingsService', () => {
  let service: TeachingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeachingsService],
    }).compile();

    service = module.get<TeachingsService>(TeachingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
