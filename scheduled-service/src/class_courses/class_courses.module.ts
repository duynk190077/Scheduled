import { Module } from '@nestjs/common';
import { ClassCoursesService } from './class_courses.service';
import { ClassCoursesController } from './class_courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassCourse, ClassCourseSchema } from './entities/class_course.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ClassCourse.name, schema: ClassCourseSchema }])
  ],
  controllers: [ClassCoursesController],
  providers: [ClassCoursesService]
})
export class ClassCoursesModule {}
