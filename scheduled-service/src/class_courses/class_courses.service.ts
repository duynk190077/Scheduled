import { Injectable } from '@nestjs/common';
import { CreateClassCourseDto } from './dto/create-class_course.dto';
import { UpdateClassCourseDto } from './dto/update-class_course.dto';

@Injectable()
export class ClassCoursesService {
  create(createClassCourseDto: CreateClassCourseDto) {
    return 'This action adds a new classCourse';
  }

  findAll() {
    return `This action returns all classCourses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classCourse`;
  }

  update(id: number, updateClassCourseDto: UpdateClassCourseDto) {
    return `This action updates a #${id} classCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} classCourse`;
  }
}
