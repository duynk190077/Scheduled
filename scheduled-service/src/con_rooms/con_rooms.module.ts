import { Module } from '@nestjs/common';
import { ConRoomsService } from './con_rooms.service';
import { ConRoomsController } from './con_rooms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConRoom, ConRoomSchema } from './entities/con_room.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ConRoom.name, schema: ConRoomSchema }])
  ],
  controllers: [ConRoomsController],
  providers: [ConRoomsService]
})
export class ConRoomsModule {}
