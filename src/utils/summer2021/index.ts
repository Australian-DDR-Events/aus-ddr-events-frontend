// eslint-disable-next-line import/prefer-default-export
export const convertGradeToNumber = (grade: string) => {
  if (grade === 'E') {
    return 1;
  }
  if (grade === 'B') {
    return 2;
  }
  if (grade === 'A') {
    return 3;
  }
  if (grade === 'AA') {
    return 4;
  }
  if (grade === 'AAA') {
    return 5;
  }
  return 0;
};
