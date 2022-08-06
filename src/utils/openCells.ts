import { cloneDeep } from 'lodash';
import { StateType } from '../entities';
import { getSurroundingCells } from './index';

const openCells = (grid: StateType[][], x: number, y: number) => {
  const gridCopy = cloneDeep(grid);
  const gridSize = grid.length - 1;

  const openCell = (x: number, y: number) => {
    if (x < 0 || y < 0 || x > gridSize || y > gridSize) return gridCopy;

    if (!gridCopy[x][y].isMine && !gridCopy[x][y].isOpen) {
      if (gridCopy[x][y].mineCount === 0) {
        gridCopy[x][y].isOpen = true;
        const surroundingCells = getSurroundingCells(x, y);
        surroundingCells.map((cur) => openCell(...cur));
      } else if (gridCopy[x][y].mineCount > 0) {
        gridCopy[x][y].isOpen = true;
        return gridCopy;
      }
    } else {
      return gridCopy;
    }

    return gridCopy;
  };

  return openCell(x, y);
};

export { openCells };
