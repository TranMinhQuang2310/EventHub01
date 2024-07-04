//Convert số sang kiểu dữ liệu string
export const numberToString = (num: number) =>
  num < 10 ? `0${num}` : `${num}`;
