import React, { FC } from 'react';

import Cell from '../Cell';
import { addMines, createGrid } from '../../utils';

import './Grid.css';

const Grid: FC = () => {
  const gridSize = 16;
  const totalMines = 40;

  const grid = createGrid(gridSize);
  const gridWithMines = addMines(totalMines, grid);

  return (
    <div className="grid-wrapper">
      {gridWithMines.map((row, xIdx) =>
        row.map((cell, yIdx) => <Cell key={`${xIdx}-${yIdx}`} {...cell} />)
      )}
    </div>
  );
};

export default Grid;
