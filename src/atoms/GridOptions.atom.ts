import { atom } from 'jotai';

import { GridOptions } from '../entities';
import { MEDIUM, SMALL } from '../constants';

const gridOptionsAtom = atom<GridOptions>(window.innerWidth < 680 ? SMALL : MEDIUM);

export { gridOptionsAtom };
