import React, { FC } from 'react';
import clsx from 'clsx';

import { StateType } from '../../entities';
import styles from './Cell.module.css';

interface CellType extends StateType {
  x: number;
  y: number;
}

const Cell: FC<CellType> = React.memo(({ x, y, mineCount, isFlagged, isMine, isOpen }) => {
  if (isOpen)
    return (
      <span
        className={clsx(styles.cell, { [styles.isOpen]: isOpen })}
        data-x-position={x}
        data-y-position={y}
        data-value={mineCount}
      >
        {isMine ? '💣' : mineCount}
      </span>
    );

  return (
    <span
      className={clsx(styles.cell, { [styles.isOpen]: isOpen })}
      data-x-position={x}
      data-y-position={y}
    >
      {isFlagged ? '🚩' : ''}
    </span>
  );
});

export default Cell;
