export const InitTimetable = (
  room: number,
  day: number,
  lessonPerday: number,
) => {
  let timetable = [];
  for (let i = 0; i < room; i++) {
    timetable[i] = [];
    for (let j = 2; j <= day + 1; j++) {
      timetable[i][j] = [];
      for (let k = 1; k <= lessonPerday; k++) {
        timetable[i][j][k] = true;
      }
    }
  }
  return timetable;
};
