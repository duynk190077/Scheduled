import { Injectable } from '@nestjs/common';
import { CreateConRoomDto } from './dto/create-con_room.dto';
import { UpdateConRoomDto } from './dto/update-con_room.dto';

@Injectable()
export class ConRoomsService {
  create(createConRoomDto: CreateConRoomDto) {
    return 'This action adds a new conRoom';
  }

  findAll() {
    return `This action returns all conRooms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conRoom`;
  }

  update(id: number, updateConRoomDto: UpdateConRoomDto) {
    return `This action updates a #${id} conRoom`;
  }

  remove(id: number) {
    return `This action removes a #${id} conRoom`;
  }
}
