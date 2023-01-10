import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeachersService extends BaseService<Teacher, CreateTeacherDto, UpdateTeacherDto> {
   constructor(
    @InjectModel('Teacher') private readonly teacherModel: Model<Teacher & Document>
   ) {
    super(teacherModel);
   }
}
