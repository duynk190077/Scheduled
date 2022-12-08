import { Test, TestingModule } from '@nestjs/testing';
import { ConTeachersService } from './con_teachers.service';

describe('ConTeachersService', () => {
  let service: ConTeachersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConTeachersService],
    }).compile();

    service = module.get<ConTeachersService>(ConTeachersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
