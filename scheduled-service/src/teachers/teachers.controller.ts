import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { BaseController } from 'src/base/base.controller';
import { Teacher } from './entities/teacher.entity';

@Controller('teachers')
export class TeachersController extends BaseController<
  Teacher,
  CreateTeacherDto,
  UpdateTeacherDto
> {
  constructor(private readonly teachersService: TeachersService) {
    super(teachersService);
  }
}
