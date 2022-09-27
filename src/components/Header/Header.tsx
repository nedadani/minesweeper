import React, { FC } from 'react';
import { useAtomValue, useAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';

import { flagCountAtom, gridOptionsAtom, isGameOverAtom, gridAtom } from '../../atoms';
import styles from './Header.module.css';

const Header: FC = () => {
  const [isGameOver, setGameOver] = useAtom(isGameOverAtom);
  const gridOptions = useAtomValue(gridOptionsAtom);
  const flagCount = useAtomValue(flagCountAtom);
  const resetGrid = useResetAtom(gridAtom);

  const handleClick = () => {
    resetGrid();
    setGameOver(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.counter}>
        <span>{gridOptions.totalMines}</span>
        <span>💣</span>
      </div>

      <button onClick={handleClick} className={styles.catmoji}>
        {isGameOver ? '😿' : '😺'}
      </button>

      <div className={styles.counter}>
        <span>🚩</span>
        <span>{flagCount}</span>
      </div>
    </div>
  );
};

export default Header;
