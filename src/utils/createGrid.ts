import { StateType } from '../entities';
import { DEFAULT_STATE } from '../constants';

const createGrid = (size: number): StateType[][] => {
  const grid = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ ...DEFAULT_STATE }))
  );

  return grid;
};

export { createGrid };
