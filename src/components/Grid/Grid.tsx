import React, { FC, useState, SyntheticEvent, TouchEvent } from 'react';
import { cloneDeep, isEqual } from 'lodash';
import { useAtomValue, useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import clsx from 'clsx';

import { flagCountAtom, gridAtom, gridOptionsAtom, isGameOverAtom } from '../../atoms';
import { getCellPosition, openCells, revealMines, countFlags } from '../../utils';
import { SMALL, MEDIUM } from '../../constants';
import Cell from '../Cell';

import styles from './Grid.module.css';

const Grid: FC = () => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isGameOver, setGameOver] = useAtom(isGameOverAtom);
  const [grid, updateGrid] = useAtom(gridAtom);
  const gridOptions = useAtomValue(gridOptionsAtom);
  const updateFlagCount = useUpdateAtom(flagCountAtom);

  const handleClick = (e: SyntheticEvent) => {
    if ((e.target as HTMLSpanElement).attributes.length < 2) return;

    const { x, y } = getCellPosition(e);
    const currentCell = grid[x][y];

    if (!isGameOver) {
      if (currentCell.mineCount === 0 && !currentCell.isMine) {
        const newGrid = openCells(grid, x, y);
        updateGrid(newGrid);
      }

      if (currentCell.mineCount > 0 && !currentCell.isMine) {
        updateGrid((cur) => {
          const newState = [...cur];
          newState[x][y].isOpen = true;
          return newState;
        });
      }

      if (currentCell.isMine) {
        const newGrid = revealMines(grid);
        updateGrid(newGrid);
        setGameOver(true);
      }

      updateFlagCount(countFlags(grid));
    }
  };

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

  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.mobileGrid]: isEqual(gridOptions, SMALL),
        [styles.desktopGrid]: isEqual(gridOptions, MEDIUM),
      })}
      onClick={handleClick}
      onContextMenu={handleContextMenuClick}
      onTouchStart={(e) => handleTouch(e, 'start')}
      onTouchEnd={(e) => handleTouch(e, 'end')}
    >
      {grid.map((row, xIdx) =>
        row.map((cell, yIdx) => <Cell key={`${xIdx}-${yIdx}`} x={xIdx} y={yIdx} {...cell} />)
      )}
    </div>
  );
};

export default Grid;
