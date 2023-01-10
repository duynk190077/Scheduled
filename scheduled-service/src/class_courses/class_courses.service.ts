import { Injectable } from '@nestjs/common';
import { CreateClassCourseDto } from './dto/create-class_course.dto';
import { UpdateClassCourseDto } from './dto/update-class_course.dto';
import { ClassCourse } from './entities/class_course.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Scheduled } from 'src/scheduled/scheduled';
import { BaseService } from 'src/base/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { TeachingsService } from 'src/teachings/teachings.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { TeachersService } from 'src/teachers/teachers.service';
import { Teaching } from 'src/teachings/entities/teaching.entity';
import { CoursesService } from 'src/courses/courses.service';
import { ResponseDto } from 'src/response/response';

@Injectable()
export class ClassCoursesService extends BaseService<ClassCourse, CreateClassCourseDto, UpdateClassCourseDto> {

  constructor(
    @InjectModel('ClassCourse') private readonly classCourseModel: Model<ClassCourse & Document>,
    private teachingService: TeachingsService,
    private roomService: RoomsService,
    private teacherService: TeachersService,
    private courseService: CoursesService
  ) {
    super(classCourseModel);
      }

  async scheduled() {
    const teachers = (await this.teacherService.findAll()).data;
    const rooms = (await this.roomService.findAll()).data;
    const teachings = (await this.teachingService.findAll()).data;
    const courses = (await this.courseService.findAll()).data;
    const class_courses = (await this.findAll()).data;
    let teachingConverts: Teaching[] = [];
    teachers.map((p: any) => {
      const class_codes = teachings.filter((e) => e.teacher_id.toString() === p._id.toString())
      teachingConverts.push({
        teacher_id: p._id,
        class_code: '',
        class_codes: class_codes.map((e) => e.class_code)
      })
    })
    let con_groups = [];
    for (let i = 1; i <= 10; i++) {
      let groups = courses.filter((c) => c.semester === i);
      con_groups.push(groups.map((g) => g.code));
    }
    const scheduled = new Scheduled(class_courses, rooms, teachingConverts, 0.15, con_groups);
    console.log(class_courses.length * 2);
    // console.log(rooms.length);
    const bestChromosome  = scheduled.scheduled();
    let class_course_details = [];
    for (let i = 0; i < class_courses.length; i++) {
      class_course_details.push({
        _id: class_courses[i]._id,
        code: class_courses[i].code,
        course_code: class_courses[i].course_code,
        day: Math.floor(bestChromosome.gen[i].day / 2) + 1,
        session: bestChromosome.gen[i].day % 2,
        start: bestChromosome.gen[i].start,
        end: bestChromosome.gen[i].end,
        room: rooms[bestChromosome.gen[i].room].name,
        teacher_id: (teachings.find((e) => e.class_code === class_courses[i].code)).teacher_id,
        size: class_courses[i].size
      })
    }
    return new ResponseDto(0, 200, class_course_details);
  }
}
