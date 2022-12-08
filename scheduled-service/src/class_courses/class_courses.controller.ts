import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassCoursesService } from './class_courses.service';
import { CreateClassCourseDto } from './dto/create-class_course.dto';
import { UpdateClassCourseDto } from './dto/update-class_course.dto';

@Controller('class-courses')
export class ClassCoursesController {
  constructor(private readonly classCoursesService: ClassCoursesService) {}

  @Post()
  create(@Body() createClassCourseDto: CreateClassCourseDto) {
    return this.classCoursesService.create(createClassCourseDto);
  }

  @Get()
  findAll() {
    return this.classCoursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classCoursesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassCourseDto: UpdateClassCourseDto) {
    return this.classCoursesService.update(+id, updateClassCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classCoursesService.remove(+id);
  }
}
