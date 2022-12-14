import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConTeachersService } from './con_teachers.service';
import { CreateConTeacherDto } from './dto/create-con_teacher.dto';
import { UpdateConTeacherDto } from './dto/update-con_teacher.dto';

@Controller('con-teachers')
export class ConTeachersController {
  constructor(private readonly conTeachersService: ConTeachersService) {}

  @Post()
  create(@Body() createConTeacherDto: CreateConTeacherDto) {
    return this.conTeachersService.create(createConTeacherDto);
  }

  @Get()
  findAll() {
    return this.conTeachersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conTeachersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConTeacherDto: UpdateConTeacherDto,
  ) {
    return this.conTeachersService.update(+id, updateConTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conTeachersService.remove(+id);
  }
}
