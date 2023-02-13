import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Course } from 'src/courses/entities/course.entity';
import { CLASS_TYPES } from 'src/constant/constant';

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

  @Prop({ enum: CLASS_TYPES, default: CLASS_TYPES[1]})
  type: string;
}

export const ClassCourseSchema = SchemaFactory.createForClass(ClassCourse);
