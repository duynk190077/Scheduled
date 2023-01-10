import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeachingsService } from './teachings.service';
import { CreateTeachingDto } from './dto/create-teaching.dto';
import { UpdateTeachingDto } from './dto/update-teaching.dto';
import { BaseController } from 'src/base/base.controller';
import { Teaching } from './entities/teaching.entity';

@Controller('teachings')
export class TeachingsController extends BaseController<Teaching, CreateTeachingDto, UpdateTeachingDto> {
  constructor(private readonly teachingsService: TeachingsService) {
    super(teachingsService);
  }
}
