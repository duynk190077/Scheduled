import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ROLES } from 'src/constant/constant';

export type UserDocument = User & mongoose.Document;

@Schema({ timestamps: true })
export class User {
    id?: string;

    @Prop({ type: String, required: true, unique: true })
    username: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ enum: ROLES, default: ROLES[1] })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
