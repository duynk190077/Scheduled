import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CourseDocument = Course & mongoose.Document;

@Schema({ timestamps: true })
export class Course {
  id?: string;

  @Prop({ type: String, required: true, unique: true })
  code: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  semester: number;

  @Prop({ type: Number, required: true })
  lesson: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
