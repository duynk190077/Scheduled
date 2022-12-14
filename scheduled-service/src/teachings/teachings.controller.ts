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

@Controller('teachings')
export class TeachingsController {
  constructor(private readonly teachingsService: TeachingsService) {}

  @Post()
  create(@Body() createTeachingDto: CreateTeachingDto) {
    return this.teachingsService.create(createTeachingDto);
  }

  @Get()
  findAll() {
    return this.teachingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachingsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeachingDto: UpdateTeachingDto,
  ) {
    return this.teachingsService.update(+id, updateTeachingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachingsService.remove(+id);
  }
}
