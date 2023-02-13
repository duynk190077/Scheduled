export const InitTimetableTN = (
    room: number,
    day: number,
    lessonPerday: number,
    week: number,
  ) => {
    let timetable = [];
    for (let i = 0; i < room; i++) {
      timetable[i] = [];
      for (let j = 2; j <= day + 1; j++) {
        timetable[i][j] = [];
        for (let k = 1; k <= lessonPerday; k++) {
          timetable[i][j][k] = [];
          for (let l = 1; l <= week; l++) {
            timetable[i][j][k][l] = true;
          }
        }
      }
    }
    return timetable;
  };