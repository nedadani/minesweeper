import { SyntheticEvent } from 'react';
import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';

import { flagCountAtom, gridAtom, isGameOverAtom } from '../../atoms';
import { getCellPosition, openCells, revealMines, countFlags } from '../../utils';

const useClickHandler = () => {
  const [isGameOver, setGameOver] = useAtom(isGameOverAtom);
  const [grid, updateGrid] = useAtom(gridAtom);
  const updateFlagCount = useUpdateAtom(flagCountAtom);

  const handleClick = (e: SyntheticEvent) => {
    if ((e.target as HTMLSpanElement).attributes.length < 2) return;

    const { x, y } = getCellPosition(e);
    const currentCell = grid[x][y];

    if (!isGameOver) {
      if (currentCell.mineCount === 0 && !currentCell.isMine) {
        const newGrid = openCells(grid, x, y);
        updateGrid(newGrid);
      }

      if (currentCell.mineCount > 0 && !currentCell.isMine) {
        updateGrid((cur) => {
          const newState = [...cur];
          newState[x][y].isOpen = true;
          return newState;
        });
      }

      if (currentCell.isMine) {
        const newGrid = revealMines(grid);
        updateGrid(newGrid);
        setGameOver(true);
      }

      updateFlagCount(countFlags(grid));
    }
  };

  return { handleClick };
};

export { useClickHandler };
