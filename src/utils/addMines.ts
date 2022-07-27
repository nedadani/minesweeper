import { cloneDeep } from 'lodash';
import { CellTypes } from '../entities';

const addMines = (amount: number, grid: CellTypes[][]): CellTypes[][] => {
  const gridSize = grid.length;
  const gridCopy: CellTypes[][] = cloneDeep(grid);

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
      minesLeft = minesLeft - 1;
    }
  }

  return gridCopy;
};

export { addMines };
