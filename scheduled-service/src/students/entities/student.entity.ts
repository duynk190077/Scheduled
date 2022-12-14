import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';

export type StudentDocument = Student & mongoose.Document;

@Schema({ timestamps: true })
export class Student {
  id?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User;

  @Prop({ type: String, required: true })
  fullname: string;

  @Prop({ type: String, required: true, unique: true })
  mssv: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
