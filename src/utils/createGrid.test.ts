import { createGrid } from './index';

test('creates a two-dimentional array when given length', () => {
  expect(createGrid(0)).toEqual([]);
  expect(createGrid(1)).toEqual([[1, 1]]);
  expect(createGrid(2)).toEqual([
    [1, 1],
    [1, 2],
    [2, 1],
    [2, 2],
  ]);
});
