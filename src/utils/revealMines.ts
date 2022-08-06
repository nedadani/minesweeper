import { cloneDeep } from 'lodash';

import { StateType } from '../entities';

const revealMines = (grid: StateType[][]): StateType[][] => {
  const gridCopy = cloneDeep(grid);

  gridCopy.map((row) =>
    row.map((cell) => {
      if (cell.isMine) {
        cell.isOpen = true;
      }
      return cell;
    })
  );

  return gridCopy;
};

export { revealMines };
