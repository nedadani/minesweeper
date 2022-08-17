import { atomWithDefault } from 'jotai/utils';

import { createGrid } from '../utils';
import { gridOptionsAtom } from './GridOptions.atom';

const gridAtom = atomWithDefault((get) => {
  const { gridSize, totalMines } = get(gridOptionsAtom);
  return createGrid(gridSize, totalMines);
});

export { gridAtom };
