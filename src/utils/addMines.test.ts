import { DEFAULT_STATE } from '../constants';
import { addMines, createGrid } from './index';

test('randomly distributes the set number of mines', () => {
  /** choosing such grid size & number of mines so that each row is guaranteed
    to have at least one mined cell */

  const grid = createGrid(2);
  const stateWithMines = { ...DEFAULT_STATE, isMine: true };

  expect(addMines(3, grid)[0]).toEqual(expect.arrayContaining([stateWithMines]));
  expect(addMines(3, grid)[1]).toEqual(expect.arrayContaining([stateWithMines]));
});

test('fills grid with mines when gridSize^2 is less than the amount of mines', () => {
  const grid = createGrid(2);
  const stateWithMines = { ...DEFAULT_STATE, isMine: true };
  const expected = [
    [stateWithMines, stateWithMines],
    [stateWithMines, stateWithMines],
  ];

  expect(addMines(10, grid)).toEqual(expected);
});
