import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { CoursesModule } from './courses/courses.module';
import { RoomsModule } from './rooms/rooms.module';
import { ClassCoursesModule } from './class_courses/class_courses.module';
import { TeachingsModule } from './teachings/teachings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    // UsersModule,
    // StudentsModule,
    TeachersModule,
    CoursesModule,
    RoomsModule,
    ClassCoursesModule,
    TeachingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
