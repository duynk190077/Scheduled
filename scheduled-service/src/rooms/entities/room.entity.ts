import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CLASS_TYPES } from 'src/constant/constant';

export type RoomDocument = Room & mongoose.Document;

@Schema({ timestamps: true })
export class Room {
  id?: string;

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: Number, required: true })
  size: number;

  @Prop({ enum: CLASS_TYPES, default: CLASS_TYPES[0] })
  type: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
