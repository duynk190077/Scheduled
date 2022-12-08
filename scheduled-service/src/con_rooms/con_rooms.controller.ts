import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConRoomsService } from './con_rooms.service';
import { CreateConRoomDto } from './dto/create-con_room.dto';
import { UpdateConRoomDto } from './dto/update-con_room.dto';

@Controller('con-rooms')
export class ConRoomsController {
  constructor(private readonly conRoomsService: ConRoomsService) {}

  @Post()
  create(@Body() createConRoomDto: CreateConRoomDto) {
    return this.conRoomsService.create(createConRoomDto);
  }

  @Get()
  findAll() {
    return this.conRoomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conRoomsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConRoomDto: UpdateConRoomDto) {
    return this.conRoomsService.update(+id, updateConRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conRoomsService.remove(+id);
  }
}
