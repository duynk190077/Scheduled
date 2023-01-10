import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { ResponseDto } from 'src/response/response';
import { ClassCoursesService } from './class_courses.service';
import { CreateClassCourseDto } from './dto/create-class_course.dto';
import { UpdateClassCourseDto } from './dto/update-class_course.dto';
import { ClassCourse } from './entities/class_course.entity';

@Controller('class-courses')
export class ClassCoursesController extends BaseController<ClassCourse, CreateClassCourseDto, UpdateClassCourseDto> {
  constructor(private readonly classCoursesService: ClassCoursesService) {
    super(classCoursesService);
  }
  @Get('/scheduled/build')
  async scheduled() {
    try {
      return await this.classCoursesService.scheduled();
    } catch (err) {
      return new ResponseDto(1, 500, err);
    }
  }
}
