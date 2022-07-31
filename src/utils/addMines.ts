import { cloneDeep } from 'lodash';
import { StateType } from '../entities';
import { updateMineCount } from './index';

const addMines = (amount: number, grid: StateType[][]): StateType[][] => {
  const gridSize = grid.length;
  const gridCopy: StateType[][] = cloneDeep(grid);

  if (gridSize ** 2 <= amount) {
    return gridCopy.map((row) => {
      return row.map((cell) => {
        cell.isMine = true;
        return cell;
      });
    });
  }

  let minesLeft = amount;

  while (minesLeft > 0) {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);

    if (!gridCopy[x][y].isMine) {
      gridCopy[x][y].isMine = true;
      gridCopy[x][y].mineCount = 0;
      updateMineCount(gridCopy, x, y);
      minesLeft = minesLeft - 1;
    }
  }

  return gridCopy;
};

export { addMines };
