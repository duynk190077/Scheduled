import { Module } from '@nestjs/common';
import { ClassCoursesService } from './class_courses.service';
import { ClassCoursesController } from './class_courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassCourse, ClassCourseSchema } from './entities/class_course.entity';
import { TeachingsModule } from 'src/teachings/teachings.module';
import { RoomsModule } from 'src/rooms/rooms.module';
import { TeachersModule } from 'src/teachers/teachers.module';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClassCourse.name, schema: ClassCourseSchema },
    ]),
    TeachingsModule,
    RoomsModule,
    TeachersModule,
    CoursesModule
  ],
  controllers: [ClassCoursesController],
  providers: [ClassCoursesService],
})
export class ClassCoursesModule {}
