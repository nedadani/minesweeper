import { DEFAULT_STATE } from '../constants';
import { createGrid } from './index';

test('creates a two-dimentional array when given length', () => {
  expect(createGrid(0)).toEqual([]);

  expect(createGrid(2)).toHaveLength(2);
  expect(createGrid(2)[0]).toHaveLength(2);
  expect(createGrid(2)[1]).toHaveLength(2);
  expect(createGrid(2)[0]).toEqual(expect.arrayContaining([DEFAULT_STATE]));
});
