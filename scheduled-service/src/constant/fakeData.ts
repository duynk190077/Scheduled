import { ConRoom } from 'src/con_rooms/entities/con_room.entity';
import { ConTeacher } from 'src/con_teachers/entities/con_teacher.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Teaching } from 'src/teachings/entities/teaching.entity';
import { ClassCourse } from '../class_courses/entities/class_course.entity';

export const class_courses: ClassCourse[] = [
  {
    code: 'IT1111',
    course_code: '123456',
    size: 120,
    lesson: 2,
  },
  {
    code: 'IT1112',
    course_code: '123457',
    size: 170,
    lesson: 3,
  },
  {
    code: 'IT1113',
    course_code: '123459',
    size: 180,
    lesson: 2,
  },
  {
    code: 'IT1114',
    course_code: '123450',
    size: 200,
    lesson: 2,
  },
  {
    code: 'IT1115',
    course_code: '123451',
    size: 150,
    lesson: 2,
  },
  {
    code: 'IT1116',
    course_code: '123452',
    size: 70,
    lesson: 4,
  },
  {
    code: 'IT1117',
    course_code: '123453',
    size: 80,
    lesson: 3,
  },
];

export const rooms: Room[] = [
  {
    id: '1',
    name: 'TC-204',
    size: 120,
  },
  {
    id: '2',
    name: 'TC-205',
    size: 200,
  },
  {
    id: '3',
    name: 'TC-211',
    size: 80,
  },
];

export const teachings: Teaching[] = [
  {
    teacher_id: '1',
    class_code: ['123456', '123457', '123459'],
  },
  {
    teacher_id: '2',
    class_code: ['123450', '123451', '123452', '123453'],
  },
];

export const con_rooms: ConRoom[] = [
  {
    room_id: '1',
    constraint: [1, 2, 3, 4],
  },
  {
    room_id: '2',
    constraint: [7, 8, 9],
  },
  {
    room_id: '3',
    constraint: [13, 14, 15],
  },
];

export const con_teachers: ConTeacher[] = [
  {
    teacher_id: '1',
    constraint: [1, 2, 3, 4, 5, 6],
  },
  {
    teacher_id: '2',
    constraint: [7, 8, 9, 10, 11, 12],
  },
];

export const con_group = [
  ["IT1111", "IT1117"],
  ["IT1112", "IT1113"]
]
