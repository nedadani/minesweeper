import React, { FC } from 'react';

import styles from './Header.module.css';

interface HeaderType {
  flagCount: number;
  mineCount: number;
  isGameOver?: boolean;
}

const Header: FC<HeaderType> = ({ flagCount, mineCount, isGameOver = false }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.counter}>
        <span>{mineCount}</span>
        <span>💣</span>
      </div>

      <span className={styles.catmoji}>{isGameOver ? '😿' : '😺'}</span>

      <div className={styles.counter}>
        <span>🚩</span>
        <span>{flagCount}</span>
      </div>
    </div>
  );
};

export default Header;
