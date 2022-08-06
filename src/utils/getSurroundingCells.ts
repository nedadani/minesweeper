const getSurroundingCells = (x: number, y: number): [x: number, y: number][] => [
  [x - 1, y - 1], // top left
  [x, y - 1], // top
  [x + 1, y - 1], // top right
  [x - 1, y], // left
  [x + 1, y], // right
  [x - 1, y + 1], // left bottom
  [x, y + 1], // bottom
  [x + 1, y + 1], // bottom right
];

export { getSurroundingCells };
