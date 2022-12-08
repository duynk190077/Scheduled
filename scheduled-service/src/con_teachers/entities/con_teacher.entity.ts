import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Teacher } from 'src/teachers/entities/teacher.entity';

export type ConTeacherDocument = ConTeacher & mongoose.Document;

@Schema({ timestamps: true })
export class ConTeacher {
    id?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Teacher.name })
    teacher_id: string;

    @Prop({ type: [Boolean]})
    constraint: [boolean];
}

export const ConTeacherSchema = SchemaFactory.createForClass(ConTeacher);
