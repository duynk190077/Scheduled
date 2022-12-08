import { PartialType } from '@nestjs/mapped-types';
import { CreateClassCourseDto } from './create-class_course.dto';

export class UpdateClassCourseDto extends PartialType(CreateClassCourseDto) {}
