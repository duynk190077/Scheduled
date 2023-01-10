import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService extends BaseService<Course, CreateCourseDto, UpdateCourseDto> {

  constructor(
    @InjectModel('Course') private readonly courseModel: Model<Course & Document>
  ) {
    super(courseModel);
  }

}
