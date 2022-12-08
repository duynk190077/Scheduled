import { Test, TestingModule } from '@nestjs/testing';
import { ClassCoursesController } from './class_courses.controller';
import { ClassCoursesService } from './class_courses.service';

describe('ClassCoursesController', () => {
  let controller: ClassCoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassCoursesController],
      providers: [ClassCoursesService],
    }).compile();

    controller = module.get<ClassCoursesController>(ClassCoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
