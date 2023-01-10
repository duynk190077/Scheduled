import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { BaseController } from 'src/base/base.controller';
import { Room } from './entities/room.entity';

@Controller('rooms')
export class RoomsController extends BaseController<Room, CreateRoomDto, UpdateRoomDto> {
  constructor(private readonly roomsService: RoomsService) {
    super(roomsService);
  }
}
