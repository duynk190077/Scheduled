import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Course } from 'src/courses/entities/course.entity';

export type ClassCourseDocument = ClassCourse & mongoose.Document;

@Schema({ timestamps: true })
export class ClassCourse {
  id?: string;

  @Prop({ type: String, required: true, unique: true })
  code: string;

  @Prop({ type: mongoose.Schema.Types.String, ref: Course.name })
  course_code: string;

  @Prop({ type: Number, required: true })
  size: number;

  @Prop({ type: Number, required: true })
  lesson: number;
}

export const ClassCourseSchema = SchemaFactory.createForClass(ClassCourse);
