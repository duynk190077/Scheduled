import { PartialType } from '@nestjs/mapped-types';
import { CreateConRoomDto } from './create-con_room.dto';

export class UpdateConRoomDto extends PartialType(CreateConRoomDto) {}
