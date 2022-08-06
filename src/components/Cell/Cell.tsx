import React, { FC, SyntheticEvent, useState } from 'react';

import { StateType } from '../../entities';
import './Cell.css';

interface CellType extends StateType {
  position: { x: number; y: number };
}

const Cell: FC<CellType> = ({ position, mineCount, isFlagged, isMine, isOpen }) => {
  if (isOpen)
    return (
      <span className="cell" data-x-position={position.x} data-y-position={position.y}>
        {isMine ? 'x' : mineCount}
      </span>
    );
  return (
    <span className="cell" data-x-position={position.x} data-y-position={position.y}>
      {isFlagged ? '@' : ''}
    </span>
  );
};

export default Cell;
