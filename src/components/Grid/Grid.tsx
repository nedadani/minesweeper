import React, { FC, useState } from 'react';
import { cloneDeep } from 'lodash';

import { StateType } from '../../entities';
import Cell from '../Cell';
import { createGrid, openCells } from '../../utils';

import './Grid.css';

interface GridType {
  gridSize?: number;
  mineCount?: number;
}

const Grid: FC<GridType> = ({ gridSize = 16, mineCount = 40 }) => {
  const [grid, updateGrid] = useState<StateType[][]>(createGrid(gridSize, mineCount));
  const [gameOver, setGameOver] = useState(false);

  const onClick = (e: any) => {
    const x = Number(e.target.attributes[1].value);
    const y = Number(e.target.attributes[2].value);

    const gridCopy = cloneDeep(grid);

    if (!gameOver) {
      if (gridCopy[x][y].mineCount === 0 && !gridCopy[x][y].isMine) {
        const newGrid = openCells(gridCopy, x, y);
        updateGrid(newGrid);
        return;
      }

      if (gridCopy[x][y].mineCount > 0 && !gridCopy[x][y].isMine) {
        gridCopy[x][y].isOpen = true;
        updateGrid(gridCopy);
        return;
      }

      if (gridCopy[x][y].isMine) {
        console.log('gameOver');
        setGameOver(true);
        return;
      }
    }
  };

  return (
    <div className="grid-wrapper" onClick={onClick}>
      {grid.map((row, xIdx) =>
        row.map((cell, yIdx) => (
          <Cell key={`${xIdx}-${yIdx}`} position={{ x: xIdx, y: yIdx }} {...cell} />
        ))
      )}
    </div>
  );
};

export default Grid;
