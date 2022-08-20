import { useState, SyntheticEvent, TouchEvent } from 'react';
import { cloneDeep } from 'lodash';
import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';

import { flagCountAtom, gridAtom } from '../../atoms';
import { getCellPosition, countFlags, useClickHandler } from '../../utils';

const useContextMenuHandler = () => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [grid, updateGrid] = useAtom(gridAtom);
  const updateFlagCount = useUpdateAtom(flagCountAtom);
  const { handleClick } = useClickHandler();

  const handleContextMenuClick = (e: SyntheticEvent) => {
    e.preventDefault();

    const { x, y } = getCellPosition(e);
    const gridCopy = cloneDeep(grid);

    gridCopy[x][y].isFlagged = !gridCopy[x][y].isFlagged;

    updateGrid(gridCopy);
    updateFlagCount(countFlags(gridCopy));
  };

  const handleTouch = (e: TouchEvent, event: 'start' | 'end') => {
    if (event === 'start') {
      setTouchStart(new Date().getTime());
    }
    if (event === 'end') {
      const now = new Date().getTime();

      if (touchStart && now - touchStart > 300) {
        handleContextMenuClick(e);
      } else {
        handleClick(e);
      }

      setTouchStart(null);
    }
  };

  return { handleContextMenuClick, handleTouch };
};

export { useContextMenuHandler };
