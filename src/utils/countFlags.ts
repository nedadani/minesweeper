import { StateType } from '../entities';

const countFlags = (grid: StateType[][]): number =>
  grid.reduce(
    (prevX, x) => prevX + x.reduce((prevY, y) => (y.isFlagged && !y.isOpen ? prevY + 1 : prevY), 0),
    0
  );

export { countFlags };
