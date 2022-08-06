import React, { FC, useState, SyntheticEvent } from 'react';
import { cloneDeep } from 'lodash';

import { StateType } from '../../entities';
import Cell from '../Cell';
import { createGrid, getCellPosition, openCells } from '../../utils';

import './Grid.css';

interface GridType {
  gridSize?: number;
  mineCount?: number;
}

const Grid: FC<GridType> = ({ gridSize = 16, mineCount = 40 }) => {
  const [grid, updateGrid] = useState<StateType[][]>(createGrid(gridSize, mineCount));
  const [gameOver, setGameOver] = useState(false);

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
        console.log('gameOver');
        setGameOver(true);
      }
    }
  };

  const handleContextMenuClick = (e: SyntheticEvent) => {
    e.preventDefault();

    const { x, y } = getCellPosition(e);
    const gridCopy = cloneDeep(grid);
    gridCopy[x][y].isFlagged = !gridCopy[x][y].isFlagged;
    updateGrid(gridCopy);
  };

  return (
    <div className="grid-wrapper" onClick={handleClick} onContextMenu={handleContextMenuClick}>
      {grid.map((row, xIdx) =>
        row.map((cell, yIdx) => (
          <Cell key={`${xIdx}-${yIdx}`} position={{ x: xIdx, y: yIdx }} {...cell} />
        ))
      )}
    </div>
  );
};

export default Grid;
