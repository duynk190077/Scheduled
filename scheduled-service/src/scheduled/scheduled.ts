import { ClassCourse } from 'src/class_courses/entities/class_course.entity';
import { ConRoom } from 'src/con_rooms/entities/con_room.entity';
import { ConTeacher } from 'src/con_teachers/entities/con_teacher.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Teaching } from 'src/teachings/entities/teaching.entity';

export class Scheduled {
  private population: any[];
  private class_courses: ClassCourse[];
  private rooms: Room[];
  private teachings: Teaching[];
  private popsize: number;
  private pm: number;
  private lessonPerday: number;
  private con_teachers: ConTeacher[];
  private con_rooms: ConRoom[];
  private con_group: any[]
  constructor(
    class_courses: ClassCourse[],
    rooms: Room[],
    teachings: Teaching[],
    pm,
    con_teachers: ConTeacher[] = [],
    con_rooms: ConRoom[] = [],
    con_group: any[] = [],
  ) {
    this.class_courses = class_courses;
    this.rooms = rooms;
    this.teachings = teachings;
    this.population = [];
    this.popsize = class_courses.length * 2;
    this.pm = pm;
    this.lessonPerday = 6;
    this.con_teachers = con_teachers;
    this.con_rooms = con_rooms;
    this.con_group = con_group;
  }

  private InitPopulation() {
    for (let i = 0; i < this.popsize; i++) {
      this.population.push(this.RandomChromosome());
    }
  }

  public scheduled() {
    this.InitPopulation();
    let minFitness = 1000;
    while (minFitness !== 0) {
      for (let i = 0; i < this.population.length; i++) {
        minFitness = Math.min(this.Fitness(this.population[i]), minFitness);
      }
      if (minFitness === 0) {
        break;
      }
      this.population = this.Crossover();
      this.Mutation();
      //selective
      this.population.sort((chr1, chr2) => {
        const fit1 = this.Fitness(chr1);
        const fit2 = this.Fitness(chr2);
        return fit1 - fit2;
      });
      this.population = this.population.slice(0, this.popsize);
      // console.log("population", this.population);
    }
  }

  public getPopulation() {
    return this.population;
  }

  public getFitness() {
    let fitness = [];
    for (let i = 0; i < this.population.length; i++)
      fitness.push(this.Fitness(this.population[i]));
    return fitness;
  }
  // Calculate Fitness negative
  private Fitness(chromosome: any): number {
    let fitnessRoomSize = this.checkRoomSize(chromosome);
    let fitnessTeaching = this.checkTeching(chromosome);
    let fitnessConTeacher = this.checkConTeacher(chromosome);
    let fitnessConRoom = this.checkConRoom(chromosome);
    let fitnessConGroup = this.checkGroup(chromosome);
    return (
      fitnessRoomSize + fitnessTeaching + fitnessConTeacher + fitnessConRoom + fitnessConGroup
    );
  }
  // Mutaion
  private Mutation() {
    for (let i = 0; i < this.population.length - 1; i++) {
      let chromosome = this.population[i];
      for (let j = 0; j < chromosome.gen.length; j++) {
        const rand = this.RandomBetween(1, 1000);
        if (rand < this.pm * 1000) {
          // Random new gen
          const gen = this.RandomGen(
            this.class_courses[j],
            chromosome.timetable,
          );
          // update timetable
          for (let k = gen.start; k < gen.end; k++) {
            chromosome.timetable[gen.room][gen.day][k] = false;
          }
          // replace old gen and updaate timetable
          const oldGen = chromosome.gen[j];
          for (let k = oldGen.start; k < oldGen.end; k++) {
            chromosome.timetable[oldGen.room][oldGen.day][k] = true;
          }
          chromosome.gen[j] = gen;
        }
      }
      this.population[i] = chromosome;
    }
  }
  // Crossover
  private Crossover() {
    const checkDuplicate = (gen1, gen2) => {
      if (gen1.room !== gen2.room) return false;
      if (gen1.day !== gen2.day) return 0;
      if (gen1.start > gen2.end || gen1.end < gen2.start) return 0;
    };

    let newPopulation = [];
    for (let i = 0; i < this.population.length - 1; i++) {
      const father = this.population[i];
      for (let k = i + 1; k < this.population.length; k++) {
        const mother = this.population[k];
        let newChr1 = {
            gen: [],
            timetable: null,
          },
          newChr2 = {
            gen: [],
            timetable: null,
          };
        for (let j = 0; j < father.gen.length; j++) {
          const rand = Math.floor(Math.random() * 2);
          if (rand == 0) {
            newChr1.gen[j] = father.gen[j];
            newChr2.gen[j] = mother.gen[j];
          } else {
            newChr1.gen[j] = mother.gen[j];
            newChr2.gen[j] = father.gen[j];
          }
        }

        //Check timtable of new chromosome
        //newChr1.
        let check1 = true,
          check2 = true,
          timetable = this.InitTimetable();
        for (let w = 0; w < newChr1.gen.length - 1; w++) {
          for (let j = w + 1; j < newChr1.gen.length; j++) {
            if (checkDuplicate(newChr1.gen[w], newChr2.gen[j])) {
              check1 = false;
              break;
            }
          }
          for (let j = newChr1.gen[w].start; j <= newChr1.gen[w].end; j++)
            timetable[newChr1.gen[w].room][newChr1.gen[w].day][j] = false;
          if (!check1) break;
        }
        newChr1.timetable = timetable;
        timetable = this.InitTimetable();
        //newChr2.
        for (let w = 0; w < newChr2.gen.length - 1; w++) {
          for (let j = w + 1; j < newChr2.gen.length; j++) {
            if (checkDuplicate(newChr2.gen[w], newChr2.gen[j])) {
              check2 = false;
              break;
            }
          }
          for (let j = newChr2.gen[w].start; j <= newChr2.gen[w].end; j++)
            timetable[newChr2.gen[w].room][newChr2.gen[w].day][j] = false;
          if (!check2) break;
        }
        newChr2.timetable = timetable;
        //If timetable is valid, add newChr to population
        if (check1) newPopulation.push(newChr1);
        if (check2) newPopulation.push(newChr2);
      }
    }
    if (newPopulation.length < this.popsize)
      for (let i = 0; i < this.population.length; i++) {
        newPopulation.push(this.population[i]);
      }
    return newPopulation;
  }
  // Random NST
  private RandomChromosome(): any {
    let chromosome = {
      gen: [],
      timetable: null,
    };
    let timetable = [];
    for (let i = 0; i < this.rooms.length; i++) {
      timetable[i] = [];
      for (let j = 2; j <= 6; j++) {
        timetable[i][j] = [];
        for (let k = 1; k <= this.lessonPerday; k++) {
          timetable[i][j][k] = true;
        }
      }
    }
    for (let i = 0; i < this.class_courses.length; i++) {
      const gen = this.RandomGen(this.class_courses[i], timetable);
      for (let j = gen.start; j < gen.end; j++) {
        timetable[gen.room][gen.day][j] = false;
      }
      chromosome.gen.push(gen);
    }
    chromosome.timetable = timetable;
    return chromosome;
  }
  // Random gen
  private RandomGen(class_course: ClassCourse, timetable: boolean[][][]): any {
    while (true) {
      const day = this.RandomBetween(2, 6);
      const room = this.RandomBetween(0, this.rooms.length - 1);
      let available: number[] = [];
      for (let i = 1; i <= this.lessonPerday - class_course.lesson + 1; i++) {
        let can: boolean = true;
        for (let j = 0; j < class_course.lesson; j++) {
          if (!timetable[room][day][i + j]) can = false;
        }
        if (can) available.push(i);
      }
      if (available.length > 0) {
        const index = this.RandomBetween(0, available.length - 1);
        return {
          day: day,
          start: available[index],
          end: available[index] + class_course.lesson - 1,
          room: room,
        };
      }
    }
  }
  // fitness roomSize
  private checkRoomSize(chromosome: any): number {
    let fitness = 0;
    for (let i = 0; i < chromosome.gen.length; i++) {
      const { room } = chromosome.gen[i];
      if (this.rooms[room].size < this.class_courses[i].size) fitness++;
    }
    return fitness;
  }
  // fitness teaching
  private checkTeching(chromosome: any): number {
    const checkDuplicate = (gen1, gen2): number => {
      if (gen1.day !== gen2.day) return 0;
      if (gen1.start > gen2.end || gen1.end < gen2.start) return 0;
      return 1;
    };

    let fitness = 0;
    this.teachings.forEach((teaching) => {
      for (let i = 0; i < teaching.class_code.length; i++) {
        for (let j = i + 1; j < teaching.class_code.length; j++) {
          const index1 = this.class_courses.findIndex(
            (e) => e.course_code === teaching.class_code[i],
          );
          const index2 = this.class_courses.findIndex(
            (e) => e.course_code === teaching.class_code[j],
          );
          const fitness1 = checkDuplicate(
            chromosome.gen[index1],
            chromosome.gen[index2],
          );
          fitness = fitness + fitness1;
        }
      }
    });
    return fitness;
  }

  private RandomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private checkConTeacher(chromosome: any): number {
    let fitness = 0;
    const checkDuplicate = (constraint: number[], gen) => {
      for (let i = gen.start; i <= gen.end; i++) {
        if (constraint.includes((gen.day - 2) * this.lessonPerday + i))
          return 1;
      }
      return 0;
    };
    this.teachings.forEach((teaching) => {
      const con_teacher =
        this.con_teachers[
          this.con_teachers.findIndex(
            (e) => e.teacher_id === teaching.teacher_id,
          )
        ];
      for (let i = 0; i < teaching.class_code.length; i++) {
        const index = this.class_courses.findIndex(
          (e) => e.course_code === teaching.class_code[i],
        );
        fitness += checkDuplicate(
          con_teacher.constraint,
          chromosome.gen[index],
        );
      }
    });
    return fitness;
  }

  private checkConRoom(chromosome: any): number {
    let fitness = 0;
    const checkDuplicate = (constraint: number[], gen) => {
      for (let i = gen.start; i <= gen.end; i++) {
        if (constraint.includes((gen.day - 2) * this.lessonPerday + i))
          return 1;
      }
      return 0;
    };
    this.rooms.forEach((room) => {
      const con_room =
        this.con_rooms[this.con_rooms.findIndex((e) => e.room_id === room.id)];
      for (let i = 0; i < chromosome.gen.length; i++) {
        const gen = chromosome.gen[i];
        if (this.rooms[gen.room].id === room.id) {
          fitness += checkDuplicate(con_room.constraint, gen);
        }
      }
    });
    return fitness;
  }

  private checkGroup(chromosome: any): number {
    let fitness: number = 0;
    const checkDuplicate = (gen1, gen2): number => {
      if (gen1.day !== gen2.day) return 0;
      if (gen1.start > gen2.end || gen1.end < gen2.start) return 0;
      return 1;
    };
    for (let k = 0 ; k < this.con_group.length; k++) {
      const course_group = this.con_group[k];
      for (let i = 0 ; i < course_group.length - 1; i++) {
        for (let j = i + 1; j < course_group.length; j++) {
          const index1 = this.class_courses.findIndex((e) => e.code === course_group[i]);
          const index2 = this.class_courses.findIndex((e) => e.code === course_group[j]);
          fitness += checkDuplicate(chromosome.gen[index1], chromosome.gen[index2]);
        }
      }
    }
    return fitness;
  }
 
  private InitTimetable() {
    let timetable = [];
    for (let i = 0; i < this.rooms.length; i++) {
      timetable[i] = [];
      for (let j = 2; j <= 6; j++) {
        timetable[i][j] = [];
        for (let k = 1; k <= this.lessonPerday; k++) {
          timetable[i][j][k] = true;
        }
      }
    }
    return timetable;
  }
}
