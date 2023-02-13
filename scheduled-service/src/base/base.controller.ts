import { Body, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { ResponseDto } from 'src/response/response';
import { BaseService } from './base.service';

export class BaseController<Entity, CreateDto, UpdateDto> {
  constructor(
    private entityService: BaseService<Entity, CreateDto, UpdateDto>,
  ) {}

  @Post()
  async create(@Body() createDto: CreateDto): Promise<ResponseDto> {
    try {
      return await this.entityService.create(createDto);
    } catch (err) {
      return new ResponseDto(0, 500, null, err);
    }
  }

  @Get()
  async findAll(): Promise<ResponseDto> {
    try {
      return await this.entityService.findAll();
    } catch (err) {
      return new ResponseDto(0, 500, null, err);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto> {
    try {
      return await this.entityService.findOne(+id);
    } catch (err) {
      return new ResponseDto(0, 500, null, err);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDto,
  ): Promise<ResponseDto> {
    try {
      return await this.entityService.update(+id, updateDto);
    } catch (err) {
      return new ResponseDto(0, 500, null, err);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseDto> {
    return await this.entityService.remove(+id);
  }
}
