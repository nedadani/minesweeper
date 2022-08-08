import React, { FC } from 'react';
import clsx from 'clsx';

import { StateType } from '../../entities';
import styles from './Cell.module.css';

interface CellType extends StateType {
  position: { x: number; y: number };
}

const Cell: FC<CellType> = ({ position, mineCount, isFlagged, isMine, isOpen }) => {
  if (isOpen)
    return (
      <span
        className={clsx(styles.cell, { [styles.isOpen]: isOpen })}
        data-x-position={position.x}
        data-y-position={position.y}
        data-value={mineCount}
      >
        {isMine ? '💣' : mineCount}
      </span>
    );

  return (
    <span
      className={clsx(styles.cell, { [styles.isOpen]: isOpen })}
      data-x-position={position.x}
      data-y-position={position.y}
    >
      {isFlagged ? '🚩' : ''}
    </span>
  );
};

export default Cell;
