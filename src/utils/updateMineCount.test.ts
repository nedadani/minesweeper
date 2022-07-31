import { cloneDeep } from 'lodash';
import { DEFAULT_STATE } from '../constants';
import { updateMineCount } from './index';

test('calculates number of mines around mined cell correctly', () => {
  const notMined = cloneDeep(DEFAULT_STATE);
  const mined = { ...cloneDeep(DEFAULT_STATE), isMine: true };
  /**
     [0, 0]
     [0, x]
  */
  const grid = [
    [notMined, notMined],
    [notMined, mined],
  ];
  /**
     [1, 1]
     [1, x]
  */
  const gridCopy = cloneDeep(grid);
  gridCopy[0][0].mineCount = 1;
  gridCopy[0][1].mineCount = 1;
  gridCopy[1][0].mineCount = 1;

  expect(updateMineCount(gridCopy, 1, 1)).toStrictEqual(gridCopy);
});
