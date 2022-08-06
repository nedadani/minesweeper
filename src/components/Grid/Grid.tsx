import React, { FC, useEffect, useState, SyntheticEvent } from 'react';
import { cloneDeep } from 'lodash';

import { createGrid, getCellPosition, openCells, revealMines } from '../../utils';
import { StateType } from '../../entities';
import Cell from '../Cell';

import './Grid.css';

interface GridType {
  gridSize: number;
  mineCount: number;
}

const Grid: FC<GridType> = ({ gridSize, mineCount }) => {
  const [grid, updateGrid] = useState<StateType[][]>([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => updateGrid(createGrid(gridSize, mineCount)), [gridSize, mineCount]);

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
