import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './entities/teacher.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),
  ],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
