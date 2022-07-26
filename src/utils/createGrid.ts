import { CellTypes } from '../entities';
import { DEFAULT_STATE } from '../constants';

const createGrid = (length: number): CellTypes[][] => {
  const grid: CellTypes[][] = [];

  for (let i = 0; i < length; i++) {
    grid.push(new Array(length).fill(DEFAULT_STATE));
  }

  return grid;
};

export { createGrid };
