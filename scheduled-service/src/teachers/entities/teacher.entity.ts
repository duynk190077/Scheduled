import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';

export type TeacherDocument = Teacher & mongoose.Document;

@Schema({ timestamps: true })
export class Teacher {
  id?: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  // user_id: string;

  @Prop({ type: String, required: true })
  fullname: string;

  @Prop({ type: String, required: true })
  email: string;

  // @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Course.name })
  // course_ids: string[];
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
