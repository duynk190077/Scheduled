import { Test, TestingModule } from '@nestjs/testing';
import { ClassCoursesService } from './class_courses.service';

describe('ClassCoursesService', () => {
  let service: ClassCoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassCoursesService],
    }).compile();

    service = module.get<ClassCoursesService>(ClassCoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
