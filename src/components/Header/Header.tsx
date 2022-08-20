import React, { FC } from 'react';
import { useAtomValue } from 'jotai';

import { flagCountAtom, gridOptionsAtom, isGameOverAtom } from '../../atoms';
import styles from './Header.module.css';

const Header: FC = () => {
  const gridOptions = useAtomValue(gridOptionsAtom);
  const flagCount = useAtomValue(flagCountAtom);
  const isGameOver = useAtomValue(isGameOverAtom);

  return (
    <div className={styles.wrapper}>
      <div className={styles.counter}>
        <span>{gridOptions.totalMines}</span>
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
