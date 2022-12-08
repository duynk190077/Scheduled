import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ClassCourse } from 'src/class_courses/entities/class_course.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';

export type TeachingDocument = Teaching & mongoose.Document;

@Schema({ timestamps: true })
export class Teaching {
    id?: string;

    @Prop({ type: mongoose.Schema.Types.String, ref: ClassCourse.name })
    class_code: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Teacher.name })
    teacher_id: string;
}

export const TeachingSchema = SchemaFactory.createForClass(Teaching);
