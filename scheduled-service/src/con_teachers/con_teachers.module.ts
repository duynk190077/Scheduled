import { Module } from '@nestjs/common';
import { ConTeachersService } from './con_teachers.service';
import { ConTeachersController } from './con_teachers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConTeacher, ConTeacherSchema } from './entities/con_teacher.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ConTeacher.name, schema: ConTeacherSchema },
    ]),
  ],
  controllers: [ConTeachersController],
  providers: [ConTeachersService],
})
export class ConTeachersModule {}
