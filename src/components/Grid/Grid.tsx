import React, { FC } from 'react';

import Cell from '../Cell';
import { createGrid } from '../../utils';

import './Grid.css';

const Grid: FC = () => {
  const gridSize = 16;
  const gridDimensions = createGrid(gridSize);

  return (
    <div className="grid-wrapper">
      {gridDimensions.map((coord) => (
        <Cell coords={{ x: coord[0], y: coord[1] }} />
      ))}
    </div>
  );
};

export default Grid;
