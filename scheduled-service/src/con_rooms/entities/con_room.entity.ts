import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Room } from 'src/rooms/entities/room.entity';

export type ConRoomDocument = ConRoom & mongoose.Document;

@Schema({ timestamps: true })
export class ConRoom {
    id?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Room.name })
    room_id: string;

    @Prop({ type: [Boolean]})
    constraint: [boolean];
}

export const ConRoomSchema = SchemaFactory.createForClass(ConRoom);
