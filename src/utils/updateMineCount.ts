import { StateType } from '../entities';
import { getSurroundingCells } from './index';

const updateMineCount = (grid: StateType[][], x: number, y: number): StateType[][] => {
  const max = grid.length - 1;
  const surroundingCells = getSurroundingCells(x, y);

  while (surroundingCells.length > 0) {
    const cur = surroundingCells[0];

    // out of bounds
    if (cur[0] > max || cur[1] > max || cur[0] < 0 || cur[1] < 0) {
      surroundingCells.shift();
    } else {
      grid[cur[0]][cur[1]].mineCount += +1;
      surroundingCells.shift();
    }
  }
  return grid;
};

export { updateMineCount };
