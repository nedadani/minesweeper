import { StateType } from '../entities';
import { DEFAULT_STATE } from '../constants';
import { addMines } from './index';

const createGrid = (size: number, amount: number): StateType[][] => {
  const grid = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ ...DEFAULT_STATE }))
  );

  const gridWithMines = addMines(amount, grid);

  return gridWithMines;
};

export { createGrid };
