const createGrid = (length: number) => {
  const arr = Array.from(Array(length).keys(), (num) => num + 1);
  const twoDimentionalArr: [number, number][] = [];

  arr.forEach((element) => {
    for (let i = 0; i < arr.length; i++) {
      twoDimentionalArr.push([element, i + 1]);
    }
  });

  return twoDimentionalArr;
};

export { createGrid };
