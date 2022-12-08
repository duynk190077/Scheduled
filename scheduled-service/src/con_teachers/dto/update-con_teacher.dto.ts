import { PartialType } from '@nestjs/mapped-types';
import { CreateConTeacherDto } from './create-con_teacher.dto';

export class UpdateConTeacherDto extends PartialType(CreateConTeacherDto) {}
