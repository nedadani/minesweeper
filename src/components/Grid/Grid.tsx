import React, { FC, SetStateAction, useEffect, useState, SyntheticEvent, TouchEvent } from 'react';
import { cloneDeep, isEqual } from 'lodash';
import clsx from 'clsx';

import { createGrid, getCellPosition, openCells, revealMines, countFlags } from '../../utils';
import { SMALL, MEDIUM } from '../../constants';
import { StateType } from '../../entities';
import Cell from '../Cell';

import styles from './Grid.module.css';

interface GridType {
  gridSize: number;
  totalMines: number;
  updateFlagCount: (newCount: SetStateAction<number>) => void;
}

const Grid: FC<GridType> = ({ gridSize, totalMines, updateFlagCount }) => {
  const [grid, updateGrid] = useState<StateType[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => updateGrid(createGrid(gridSize, totalMines)), [gridSize, totalMines]);

  const handleClick = (e: SyntheticEvent) => {
    const { x, y } = getCellPosition(e);
    const gridCopy = cloneDeep(grid);
    const currentCell = gridCopy[x][y];

    if (!gameOver) {
      if (currentCell.mineCount === 0 && !currentCell.isMine) {
        const newGrid = openCells(gridCopy, x, y);
        updateGrid(newGrid);
      }

      if (currentCell.mineCount > 0 && !currentCell.isMine) {
        currentCell.isOpen = true;
        updateGrid(gridCopy);
      }

      if (currentCell.isMine) {
        const newGrid = revealMines(gridCopy);
        updateGrid(newGrid);
        setGameOver(true);
      }

      updateFlagCount(countFlags(gridCopy));
    }
  };

  const handleContextMenuClick = (e: SyntheticEvent) => {
    e.preventDefault();

    const { x, y } = getCellPosition(e);
    const gridCopy = cloneDeep(grid);

    gridCopy[x][y].isFlagged = !gridCopy[x][y].isFlagged;

    updateGrid(gridCopy);
    updateFlagCount((cur: number) => cur++);
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
        [styles.mobileGrid]: isEqual({ gridSize, totalMines }, SMALL),
        [styles.desktopGrid]: isEqual({ gridSize, totalMines }, MEDIUM),
      })}
      onClick={handleClick}
      onContextMenu={handleContextMenuClick}
      onTouchStart={(e) => handleTouch(e, 'start')}
      onTouchEnd={(e) => handleTouch(e, 'end')}
    >
      {grid.map((row, xIdx) =>
        row.map((cell, yIdx) => (
          <Cell key={`${xIdx}-${yIdx}`} position={{ x: xIdx, y: yIdx }} {...cell} />
        ))
      )}
    </div>
  );
};

export default Grid;
