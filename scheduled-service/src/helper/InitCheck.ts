export const InitCheck = (size) => {
  let check = [];
  for (let i = 0; i < size; i++) {
    check[i] = [];
    for (let j = 0; j < size; j++) {
      check[i][j] = false;
    }
  }
  return check;
};
