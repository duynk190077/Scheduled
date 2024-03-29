import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Put } from '@nestjs/common/decorators';
import { BaseController } from 'src/base/base.controller';
import { ResponseDto } from 'src/response/response';
import { ClassCoursesService } from './class_courses.service';
import { CreateClassCourseDto } from './dto/create-class_course.dto';
import { UpdateClassCourseDto } from './dto/update-class_course.dto';
import { ClassCourse } from './entities/class_course.entity';

@Controller('class-courses')
export class ClassCoursesController extends BaseController<
  ClassCourse,
  CreateClassCourseDto,
  UpdateClassCourseDto
> {
  constructor(private readonly classCoursesService: ClassCoursesService) {
    super(classCoursesService);
  }
  @Post('/scheduled/build')
  async scheduled(@Body() scheduledData: any) {
    try {
      return await this.classCoursesService.scheduled(scheduledData);
    } catch (err) {
      return new ResponseDto(1, 500, err);
    }
  }

  @Get('/scheduled/group')
  async group() {
    try {
      return await this.classCoursesService.group();
    } catch (err) {
      return new ResponseDto(1, 500, err);
    }
  }

}
