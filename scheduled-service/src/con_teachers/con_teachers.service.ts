import { Injectable } from '@nestjs/common';
import { CreateConTeacherDto } from './dto/create-con_teacher.dto';
import { UpdateConTeacherDto } from './dto/update-con_teacher.dto';

@Injectable()
export class ConTeachersService {
  create(createConTeacherDto: CreateConTeacherDto) {
    return 'This action adds a new conTeacher';
  }

  findAll() {
    return `This action returns all conTeachers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conTeacher`;
  }

  update(id: number, updateConTeacherDto: UpdateConTeacherDto) {
    return `This action updates a #${id} conTeacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} conTeacher`;
  }
}
