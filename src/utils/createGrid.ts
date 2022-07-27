import { CellTypes } from '../entities';
import { DEFAULT_STATE } from '../constants';
import { addMines } from './index';

const createGrid = (size: number): CellTypes[][] => {
  const grid = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ ...DEFAULT_STATE }))
  );

  return grid;
};

export { createGrid };
