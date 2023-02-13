import { ClassCourse } from 'src/class_courses/entities/class_course.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Teaching } from 'src/teachings/entities/teaching.entity';
import { InitTimetable } from 'src/helper/InitTimeTable';
import { InitCheck } from 'src/helper/InitCheck';
import { InitTimetableTN } from 'src/helper/InitTimeTableTN';

export class Scheduled {
  private population: any[];
  private class_courses: ClassCourse[];
  private rooms: Room[];
  private teachings: Teaching[];
  private popsize: number;
  private pm: number;
  private lessonPerday: number;
  private day: number;
  private con_group: any[];
  private intiTimetable: any;
  private intiTimetableTN: any;
  private roomTNs: Room[];
  private stopFitness: number;
  private genType: number;
  private isConRoomSize: boolean;
  private isConGroup: boolean;
  private isConTeaching: boolean;
  // private initCheck: any;
  constructor(
    class_courses: ClassCourse[],
    rooms: Room[],
    roomTNs: Room[],
    teachings: Teaching[],
    pm,
    scale: number,
    genType: number,
    constraints: number[],
    stopFitness: number,
    con_group: any[] = [],
  ) {
    this.class_courses = class_courses;
    this.rooms = rooms;
    this.teachings = teachings;
    this.population = [];
    this.popsize = class_courses.length * scale;
    this.pm = pm;
    this.lessonPerday = 6;
    this.day = 10;
    this.con_group = con_group;
    this.intiTimetable = InitTimetable(rooms.length, 10, 6);
    this.roomTNs = roomTNs;
    this.intiTimetableTN = InitTimetableTN(roomTNs.length, 10, 6, 18);
    this.genType = genType;
    this.isConRoomSize = constraints.includes(1);
    this.isConGroup = constraints.includes(2);
    this.isConTeaching = constraints.includes(3);
    this.stopFitness = stopFitness;
    // this.initCheck = InitCheck(class_courses.length * 10);
  }

  private InitPopulation() {
    for (let i = 0; i < this.popsize; i++) {
      this.population.push(this.RandomChromosome());
    }
  }

  public scheduled() {
    const startTime = new Date();
    this.InitPopulation();
    let minFitness = 1000;
    let dem = 0;
    while (minFitness > this.stopFitness) {
      dem++;
      this.population.sort((chr1, chr2) => {
        return chr2.fitness - chr1.fitness;
      });
      this.population = this.population.slice(-this.popsize);
      minFitness = this.population[this.population.length - 1].fitness;
      console.log(dem, minFitness);
      this.Fitness(this.population[this.population.length - 1], true);
      if (minFitness <= this.stopFitness) {
        break;
      }
      const crossPopulation = this.Crossover();
      const mutationPopulation = this.Mutation();
      this.population = this.population.concat(
        crossPopulation,
        mutationPopulation,
      );
      this.popsize = Math.floor(this.popsize * 1.03);
    }
    const endTime = new Date();
    const finish = Math.abs(endTime.getTime() - startTime.getTime());
    console.log(finish);
    // this.Fitness(this.population[this.population.length - 1], true);
    return this.population[this.population.length - 1];
  }

  public getPopulation() {
    return this.population;
  }

  // Calculate Fitness negative
  private Fitness(chromosome: any, last: boolean = false): number {
    let fitnessRoomSize = this.isConRoomSize ? this.checkRoomSize(chromosome) : 0;
    let fitnessTeaching = this.isConTeaching ? this.checkTeching(chromosome) : 0;
    // let fitnessTeaching = 0;
    let fitnessConGroup = this.isConGroup ? this.checkGroup(chromosome) : 0;
    if (last) console.log(fitnessRoomSize, fitnessTeaching, fitnessConGroup);
    return fitnessRoomSize + fitnessTeaching + fitnessConGroup;
  }
  // Mutaion
  private Mutation() {
    let newPopulation = [];
    for (let i = 0; i < this.population.length - 1; i++) {
      let chromosome = {...this.population[i]};
      for (let j = 0; j < chromosome.gen.length; j++) {
        const rand = this.RandomBetween(1, 1000);
        if (rand < this.pm * 1000) {
          if (this.class_courses[j].type === 'LT+BT') {
            // replace old gen and updaate timetable
            const oldGen = chromosome.gen[j];
            for (let k = oldGen.start; k <= oldGen.end; k++) {
              chromosome.timetable[oldGen.room][oldGen.day - 2][k - 1] = true;
            }
            // Random new gen
            const gen = this.RandomGen(
              this.class_courses[j],
              chromosome.timetable,
            );
            // update timetable
            for (let k = gen.start; k <= gen.end; k++) {
              chromosome.timetable[gen.room][gen.day - 2][k - 1] = false;
            }
            chromosome.gen[j] = gen;
          } else {
            const oldGen = chromosome.gen[j];
            for (let k = oldGen.start; k <= oldGen.end; k++) {
              for (let t = 0 ; t < oldGen.week.length; t++)
              chromosome.timetableTN[oldGen.room][oldGen.day - 2][k - 1][oldGen.week[t] - 1] = true;
            }
            const gen = this.RandomGenTN(this.class_courses[j], chromosome.timetableTN);
            for (let k = gen.start; k <= gen.end; k++) {
              for (let t = 0 ; t < gen.week.length; t++)
              chromosome.timetableTN[gen.room][gen.day - 2][k - 1][gen.week[t] - 1] = true;
            }
          }
        }
      }
      chromosome.fitness = this.Fitness(chromosome);
      newPopulation.push(chromosome);
    }
    return newPopulation;
  }

  // Crossover
  private Crossover() {
    // let check = this.getInitCheck();
    let newPopulation = [];
    for (let i = 0; i < this.population.length - 1; i++) {
      const father = {...this.population[i]};
      const mother = {...this.population[i + 1]};
      let newChr1 = {
          gen: [],
          timetable: null,
          timetableTN: null,
          fitness: 1000,
        },
        newChr2 = {
          gen: [],
          timetable: null,
          timetableTN: null,
          fitness: 1000,
        };
      let timetable1 = this.getInitTimetable();
      let timetable1TN = this.getInitTimetableTN();
      let timetable2 = this.getInitTimetable();
      let timetable2TN = this.getInitTimetableTN();
      let check1 = true;
      let check2 = true;
      for (let j = 0; j < father.gen.length; j++) {
        const rand = Math.floor(Math.random() * 2);
        if (rand == 0) {
          newChr1.gen[j] = father.gen[j];
          newChr2.gen[j] = mother.gen[j];
        } else {
          newChr1.gen[j] = mother.gen[j];
          newChr2.gen[j] = father.gen[j];
        }
        if (this.class_courses[j].type === 'LT+BT') {
          if (check1) {
            for (let k = newChr1.gen[j].start; k <= newChr1.gen[j].end; k++) {
              if (!timetable1[newChr1.gen[j].room][newChr1.gen[j].day - 2][k - 1]) {
                check1 = false;
                break;
              }
              else timetable1[newChr1.gen[j].room][newChr1.gen[j].day - 2][k - 1] = false;
            }
          }
          if (check2) {
            for (let k = newChr2.gen[j].start; k <= newChr2.gen[j].end; k++) {
              if (!timetable2[newChr2.gen[j].room][newChr2.gen[j].day - 2][k - 1]) {
                check2 = false;
                break;
              }
              else timetable2[newChr2.gen[j].room][newChr2.gen[j].day - 2][k - 1] = false;
            }
          }
        } else {
          if (check1) {
            for (let k = newChr1.gen[j].start; k <= newChr1.gen[j].end; k++) {
              if (!check1) break;
              for (let t = 0; t < newChr1.gen[j].week.length; t++)
                if (!timetable1TN[newChr1.gen[j].room][newChr1.gen[j].day - 2][k - 1][newChr1.gen[j].week[t] -1]) {
                  check1 = false;
                  break;
                } else {
                  timetable1TN[newChr1.gen[j].room][newChr1.gen[j].day - 2][k - 1][newChr1.gen[j].week[t] -1] = false;
                }
            }
          }
          if (check2) {
            for (let k = newChr2.gen[j].start; k <= newChr2.gen[j].end; k++) {
              if (!check2) break;
              for (let t = 0; t < newChr2.gen[j].week.length; t++)
                if (!timetable2TN[newChr2.gen[j].room][newChr2.gen[j].day - 2][k - 1][newChr2.gen[j].week[t] -1]) {
                  check2 = false;
                  break;
                } else {
                  timetable2TN[newChr2.gen[j].room][newChr2.gen[j].day - 2][k - 1][newChr2.gen[j].week[t] -1] = false;
                }
            }
          }
        }
      }


      if (check1) {
        newChr1.timetable = timetable1;
        newChr1.timetableTN = timetable1TN;
        newChr1.fitness = this.Fitness(newChr1);
        newPopulation.push(newChr1);
      }
      if (check2) {
        newChr2.timetable = timetable1;
        newChr2.timetableTN = timetable1TN;
        newChr2.fitness = this.Fitness(newChr2);
        newPopulation.push(newChr2);
      }
    }

    return newPopulation;
  }

  private getInitTimetable() {
    let cloneInit = [];
    this.intiTimetable.forEach((val) => {
      let cloneInit1 = [];
      val.forEach((arr) => cloneInit1.push(Object.assign([], arr)));
      cloneInit.push(cloneInit1);
    });
    return cloneInit;
  }

  private getInitTimetableTN() {
    let cloneInit = [];
    this.intiTimetableTN.forEach((val) => {
      let cloneInit1 = [];
      val.forEach((val1) => {
        let cloneInit2 = [];
        val1.forEach((val2) => cloneInit2.push(Object.assign([], val2)));
        cloneInit1.push(cloneInit2);
      })
      cloneInit.push(cloneInit1);
    });
    return cloneInit;
  }
  // Random NST
  private RandomChromosome(): any {
    let chromosome = {
      gen: [],
      timetable: null,
      timetableTN: null,
      fitness: 1000,
    };
    let timetable = this.getInitTimetable();
    let timetableTN = this.getInitTimetableTN();
    for (let i = 0; i < this.class_courses.length; i++) {
      if (this.class_courses[i].type === 'LT+BT') {
        const gen = this.RandomGen(this.class_courses[i], timetable);
        for (let j = gen.start; j <= gen.end; j++) {
          timetable[gen.room][gen.day - 2][j - 1] = false;
        }
        chromosome.gen.push(gen);
      }
      else {
        const gen = this.RandomGenTN(this.class_courses[i], timetableTN);
        for (let j = gen.start; j <= gen.end; j++) {
          for (let k = 0; k < gen.week.length; k++)
            timetableTN[gen.room][gen.day - 2][j - 1][gen.week[k] -1] = false;
        }
        chromosome.gen.push(gen);
      }
    }
    chromosome.timetable = timetable;
    chromosome.fitness = this.Fitness(chromosome);
    chromosome.timetableTN = timetableTN;
    return chromosome;
  }
  // Random gen
  private RandomGen(class_course: ClassCourse, timetable: any): any {
    // let dem = 0;
    while (true) {
      const day = this.RandomBetween(2, this.day + 1);
      const room = this.RandomBetween(0, this.rooms.length - 1);
      let available: number[] = [];
      for (let i = 1; i <= this.lessonPerday - class_course.lesson + 1; i++) {
        let can: boolean = true;
        for (let j = 0; j < class_course.lesson; j++) {
          if (!timetable[room][day - 2][i + j - 1]) can = false;
        }
        if (can) available.push(i);
      }
      if (available.length > 0) {
        // const index = this.RandomBetween(0, available.length - 1);
        return {
          day: day,
          start: available[0],
          end: available[0] + class_course.lesson - 1,
          room: room,
          week: []
        };
      }
    }
  }

  private RandomGenTN(class_course: ClassCourse, timetable:any): any {
    while (true) {
      const day = this.RandomBetween(2, this.day + 1);
      const room = this.RandomBetween(0, this.roomTNs.length - 1);
      for (let i = 1; i <= this.lessonPerday - class_course.lesson + 1; i++) {
        let weekAvailable: number[] = [];
        for (let j = 2; j <= 18; j++) {
          let can: boolean = true;
          for (let k = 0; k < class_course.lesson; k++)
            if (!timetable[room][day - 2][k + i - 1][j - 1]) can = false;
          if (can) weekAvailable.push(j);
        }
        if (weekAvailable.length >= 5) {
          while (weekAvailable.length > 5) {
            if (this.genType === 2) {
              const randIndex = this.RandomBetween(0, weekAvailable.length - 1);
              weekAvailable.splice(randIndex, 1);
            } else {
              weekAvailable.pop();
            }
          };
          return {
            day: day,
            start: i,
            end: i + class_course.lesson - 1,
            room: room,
            week: weekAvailable
          };
        }
      }
    }
  }
  // fitness roomSize
  private checkRoomSize(chromosome: any): number {
    let fitness = 0;
    for (let i = 0; i < chromosome.gen.length; i++) {
      const { room } = chromosome.gen[i];
      if (chromosome.gen[i].week.length === 0) {
        if (this.rooms[room].size < this.class_courses[i].size) fitness++;
      } else {
        if (this.roomTNs[room].size < this.class_courses[i].size) fitness++;
      }
    }
    return fitness;
  }
  // fitness teaching
  private checkTeching(chromosome: any): number {
    const checkDuplicate = (gen1, gen2): number => {
      if (gen1.day !== gen2.day) return 0;
      if (gen1.start > gen2.end || gen1.end < gen2.start) return 0;
      if (gen1.week.length === 0 || gen1.week.length === 0) return 1;
      let check = true;
      for (let i = 0; i < gen1.week.length; i++) {
        if (gen2.week.includes(gen1.week[i])) check = false;
      }
      if (check === true) return 0;
      return 1;
    };

    let fitness = 0;
    this.teachings.forEach((teaching) => {
      for (let i = 0; i < teaching.class_codes.length; i++) {
        for (let j = i + 1; j < teaching.class_codes.length; j++) {
          if (teaching.class_codes[i] !== -1 && teaching.class_codes[j] !== -1) {
            const fitness1 = checkDuplicate(
              chromosome.gen[teaching.class_codes[i]],
              chromosome.gen[teaching.class_codes[j]],
            );
            fitness = fitness + fitness1;
          }
        }
      }
    });
    return fitness;
  }

  private RandomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // private checkConTeacher(chromosome: any): number {
  //   let fitness = 0;
  //   const checkDuplicate = (constraint: number[], gen) => {
  //     for (let i = gen.start; i <= gen.end; i++) {
  //       if (constraint.includes((gen.day - 2) * this.lessonPerday + i))
  //         return 1;
  //     }
  //     return 0;
  //   };
  //   this.teachings.forEach((teaching) => {
  //     const con_teacher =
  //       this.con_teachers[
  //         this.con_teachers.findIndex(
  //           (e) => e.teacher_id === teaching.teacher_id,
  //         )
  //       ];
  //     for (let i = 0; i < teaching.class_codess.length; i++) {
  //       const index = this.class_courses.findIndex(
  //         (e) => e.code === teaching.class_codess[i],
  //       );
  //       fitness += checkDuplicate(
  //         con_teacher.constraint,
  //         chromosome.gen[index],
  //       );
  //     }
  //   });
  //   return fitness;
  // }

  // private checkConRoom(chromosome: any): number {
  //   let fitness = 0;
  //   const checkDuplicate = (constraint: number[], gen) => {
  //     for (let i = gen.start; i <= gen.end; i++) {
  //       if (constraint.includes((gen.day - 2) * this.lessonPerday + i))
  //         return 1;
  //     }
  //     return 0;
  //   };
  //   this.rooms.forEach((room) => {
  //     const con_room =
  //       this.con_rooms[this.con_rooms.findIndex((e) => e.room_id === room.id)];
  //     for (let i = 0; i < chromosome.gen.length; i++) {
  //       const gen = chromosome.gen[i];
  //       if (this.rooms[gen.room].id === room.id) {
  //         fitness += checkDuplicate(con_room.constraint, gen);
  //       }
  //     }
  //   });
  //   return fitness;
  // }

  private checkGroup(chromosome: any): number {
    let fitness: number = 0;
    const checkDuplicate = (gen1, gen2): number => {
      if (gen1.day !== gen2.day) return 0;
      if (gen1.start > gen2.end || gen1.end < gen2.start) return 0;
      if (gen1.week.length === 0 || gen1.week.length === 0) return 1;
      let check = true;
      for (let i = 0; i < gen1.week.length; i++) {
        if (gen2.week.includes(gen1.week[i])) check = false;
      }
      if (check === true) return 0;
      return 1;
    };
    for (let k = 0; k < this.con_group.length; k++) {
      const course_group = this.con_group[k];
      for (let i = 0; i < course_group.length - 1; i++) {
        for (let j = i + 1; j < course_group.length; j++) {
          if (course_group[i] !== -1 && course_group[j] !== -1)
            fitness += checkDuplicate(
              chromosome.gen[course_group[i]],
              chromosome.gen[course_group[j]],
            );
        }
      }
    }
    return fitness;
  }
}
