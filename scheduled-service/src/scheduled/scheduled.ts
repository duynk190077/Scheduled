import { ClassCourse } from 'src/class_courses/entities/class_course.entity';
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
  private day: number;
  private con_group: any[]
  constructor(
    class_courses: ClassCourse[],
    rooms: Room[],
    teachings: Teaching[],
    pm,
    con_group: any[] = [],
  ) {
    this.class_courses = class_courses;
    this.rooms = rooms;
    this.teachings = teachings;
    this.population = [];
    this.popsize = class_courses.length * 3;
    this.pm = pm;
    this.lessonPerday = 6;
    this.day = 10;
    this.con_group = con_group;
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
    while (minFitness !== 0) {
      dem ++;
      this.population.sort((chr1, chr2) => {
        return chr2.fitness - chr1.fitness;
      });
      this.population = this.population.slice(-this.popsize);
      console.log(this.population.length, this.popsize);
      minFitness = this.population[this.population.length - 1].fitness;
      console.log(dem, minFitness);
      if (minFitness === 0) {
        break;
      }
      const crossPopulation = this.Crossover();
      // console.log(this.population.length);
      const mutationPopulation = this.Mutation();
      this.population = this.population.concat(crossPopulation, mutationPopulation);
      // this.popsize = Math.floor(this.popsize * 1.02);
    }
    const endTime = new Date();
    const finish = Math.abs(endTime.getTime() - startTime.getTime());
    console.log(finish);
    return this.population[0];
  }

  public getPopulation() {
    return this.population;
  }

  // Calculate Fitness negative
  private Fitness(chromosome: any): number {
    let fitnessRoomSize = this.checkRoomSize(chromosome);
    let fitnessTeaching = this.checkTeching(chromosome);
    let fitnessConGroup = this.checkGroup(chromosome);
    return (
      fitnessRoomSize + fitnessTeaching + fitnessConGroup
    );
  }
  // Mutaion
  private Mutation() {
    let newPopulation = [];
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
      chromosome.fitness = this.Fitness(chromosome);
      newPopulation.push(chromosome);
    }
    return newPopulation;
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
      for (let k = i + 1; k < i + 2; k++) {
        const mother = this.population[k];
        let newChr1 = {
            gen: [],
            timetable: null,
            fitness: 1000
          },
          newChr2 = {
            gen: [],
            timetable: null,
            fitness: 1000
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
        newChr1.fitness = this.Fitness(newChr1);
        newChr2.fitness = this.Fitness(newChr2);
        if (check1) newPopulation.push(newChr1);
        if (check2) newPopulation.push(newChr2);
      }
    }
    return newPopulation;
  }
  // Random NST
  private RandomChromosome(): any {
    let chromosome = {
      gen: [],
      timetable: null,
      fitness: 1000,
    };
    let timetable = [];
    for (let i = 0; i < this.rooms.length; i++) {
      timetable[i] = [];
      for (let j = 2; j <= this.day + 1; j++) {
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
    chromosome.fitness = this.Fitness(chromosome);
    return chromosome;
  }
  // Random gen
  private RandomGen(class_course: ClassCourse, timetable: boolean[][][]): any {
    while (true) {
      const day = this.RandomBetween(2, this.day + 1);
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
      for (let i = 0; i < teaching.class_codes.length; i++) {
        for (let j = i + 1; j < teaching.class_codes.length; j++) {
          const index1 = this.class_courses.findIndex(
            (e) => e.code === teaching.class_codes[i],
          );
          const index2 = this.class_courses.findIndex(
            (e) => e.code === teaching.class_codes[j],
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
      return 1;
    };
    for (let k = 0 ; k < this.con_group.length; k++) {
      const course_group = this.con_group[k];
      for (let i = 0 ; i < course_group.length - 1; i++) {
        for (let j = i + 1; j < course_group.length; j++) {
          const index1 = this.class_courses.findIndex((e) => e.course_code === course_group[i]);
          const index2 = this.class_courses.findIndex((e) => e.course_code === course_group[j]);
          if (index1 !== -1 && index2 !== -1)
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
      for (let j = 2; j <= this.day + 1; j++) {
        timetable[i][j] = [];
        for (let k = 1; k <= this.lessonPerday; k++) {
          timetable[i][j][k] = true;
        }
      }
    }
    return timetable;
  }
}
