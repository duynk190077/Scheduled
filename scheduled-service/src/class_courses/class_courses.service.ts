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
export class ClassCoursesService extends BaseService<
  ClassCourse,
  CreateClassCourseDto,
  UpdateClassCourseDto
> {
  constructor(
    @InjectModel('ClassCourse')
    private readonly classCourseModel: Model<ClassCourse & Document>,
    private teachingService: TeachingsService,
    private roomService: RoomsService,
    private teacherService: TeachersService,
    private courseService: CoursesService,
  ) {
    super(classCourseModel);
  }

  async findByType(type: string): Promise<ClassCourse[]> {
    return await this.classCourseModel.find({ type: type });
  }

  async scheduled(scheduledData: any) {
    try {
      console.log(scheduledData);
      const teachers = (await this.teacherService.findAll()).data;
      const rooms = await this.roomService.findByType('LT+BT');
      const roomTNs = await this.roomService.findByType('TN');
      // const rooms = (await this.roomService.findAll()).data;
      const teachings = (await this.teachingService.findAll()).data;
      const courses = (await this.courseService.findAll()).data;
      const class_courses = (await this.findAll()).data;
      // const class_courses = (await this.findByType('LT+BT'));

      class_courses.sort((a, b) => b.lesson - a.lesson)
      let teachingConverts: Teaching[] = [];
      teachers.map((p: any) => {
        const class_codes = teachings.filter(
          (e) => e.teacher_id.toString() === p._id.toString(),
        );
        teachingConverts.push({
          teacher_id: p._id,
          class_code: '',
          class_codes: class_codes.map((e) => class_courses.findIndex((f) => f.code === e.class_code)),
        });
      });
      let con_groups = [];
      for (let i = 1; i <= 10; i++) {
        let groups = courses.filter((c) => c.semester === i);
        // if (groups.length > 6) groups.pop();
        let con_group = [];
        groups.map((p) => {
          let class_course = class_courses.findIndex(e => e.course_code === p.code && e.type === 'LT+BT');
          if (class_course !== -1) con_group.push(class_course);
          class_course = class_courses.findIndex(e => e.course_code === p.code && e.type === 'TN');
          if (class_course !== -1) con_group.push(class_course);
        })
        if (con_group.length > 1) con_groups.push(con_group);
      }
      courses.map((c) => {
        let class_courses_lt = class_courses.filter((e) => e.course_code === c.code && e.type === 'LT+BT');
        let class_courses_tn = class_courses.filter((e) => e.course_code === c.code && e.type === 'TN');
        let index = 0;
        let index1 = 0;
        if (class_courses_tn.length > 0) {
          while (index < class_courses_lt.length) {
            let con_group = [];
            const index_lt = class_courses.findIndex((e) => e.code === class_courses_lt[index].code);
            const index_tn = class_courses.findIndex((e) => e.code === class_courses_tn[index1].code);
            if (index_lt !== -1 && index_tn !== -1) {
              {
                con_group.push(index_lt);
                con_group.push(index_tn);
                con_groups.push(con_group);
              }
            }
            index++;
            index1++;
            if (index1 === class_courses_tn.length) index1 = 0;

          }
        }
      })
      const scheduled = new Scheduled(
        class_courses,
        rooms,
        roomTNs,
        teachingConverts,
        +scheduledData.pm,
        +scheduledData.scale,
        scheduledData.genType,
        scheduledData.constraints,
        +scheduledData.stopFitness,
        con_groups,
      );
      const bestChromosome = scheduled.scheduled();
      let class_course_details = [];
      // 
      for (let i = 0; i < class_courses.length; i++) {
        class_course_details.push({
          // _id: class_courses[i]._id,
          _id: i,
          code: class_courses[i].code,
          course_code: class_courses[i].course_code,
          day: Math.floor(bestChromosome.gen[i].day / 2) + 1,
          session: bestChromosome.gen[i].day % 2,
          start: bestChromosome.gen[i].start,
          end: bestChromosome.gen[i].end,
          room: class_courses[i].type === 'LT+BT' ? rooms[bestChromosome.gen[i].room].name : roomTNs[bestChromosome.gen[i].room].name,
          teacher_id: (teachings.find((e) => e.class_code === class_courses[i].code)).teacher_id,
          size: class_courses[i].size,
          week: class_courses[i].type === 'TN' ? bestChromosome.gen[i].week : []
        })
      }
      return new ResponseDto(0, 200, class_course_details);
      return teachingConverts;
      return con_groups;
    } catch (err) {
      console.log(err);
    }
  }

  async group() {
    let con_groups = [];
    const courses = (await this.courseService.findAll()).data;
    for (let i = 1; i <= 10; i++) {
      let groups = courses.filter((c) => c.semester === i);
      con_groups.push(groups.map((g) => g.code));
    }
    return con_groups;
  }
}
