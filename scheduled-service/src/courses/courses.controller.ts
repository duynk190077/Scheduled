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
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Controller('courses')
export class CoursesController extends BaseController<Course, CreateCourseDto, UpdateCourseDto> {
  constructor(private readonly coursesService: CoursesService) {
    super(coursesService);
  }
}
