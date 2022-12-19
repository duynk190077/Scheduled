import { Injectable } from '@nestjs/common';
import { CreateClassCourseDto } from './dto/create-class_course.dto';
import { UpdateClassCourseDto } from './dto/update-class_course.dto';
import * as constant from '../constant/fakeData';
import { ClassCourse } from './entities/class_course.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Scheduled } from 'src/scheduled/scheduled';

@Injectable()
export class ClassCoursesService {
  create(createClassCourseDto: CreateClassCourseDto) {
    return 'This action adds a new classCourse';
  }

  findAll() {
    return `This action returns all classCourses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classCourse`;
  }

  update(id: number, updateClassCourseDto: UpdateClassCourseDto) {
    return `This action updates a #${id} classCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} classCourse`;
  }

  scheduled() {
    const class_course = constant.class_courses;
    const rooms = constant.rooms;
    const teachings = constant.teachings;
    const con_teachers = constant.con_teachers;
    const con_rooms = constant.con_rooms;
    const con_group = constant.con_group;
    // let population = this.initPopulation(class_course, rooms, popsize);
    const scheduled = new Scheduled(
      class_course,
      rooms,
      teachings,
      0.15,
      con_teachers,
      con_rooms,
      con_group
    );

    scheduled.scheduled();
    return scheduled.getPopulation()[0];
    // console.log(scheduled.class_courses);

    // return population;
  }
}
