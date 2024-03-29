import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService extends BaseService<
  Room,
  CreateRoomDto,
  UpdateRoomDto
> {
  constructor(
    @InjectModel('Room') private readonly roomModel: Model<Room & Document>,
  ) {
    super(roomModel);
  }

  async updateAll() {
    await this.roomModel.updateMany({}, { $set: { type: 'LT+BT' }});
    return true;
  }

  async findByType(type: string): Promise<Room[]> {
    return await this.roomModel.find({ type: type });
  }
}
