import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RoomDocument = Room & mongoose.Document;

@Schema({ timestamps: true })
export class Room {
    id?: string;

    @Prop({ type: String, required: true, unique: true })
    name: string;

    @Prop({ type: Number, required: true })
    size: number;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
