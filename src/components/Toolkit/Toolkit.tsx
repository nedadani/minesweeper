import React, { FC } from 'react';

import { Reset } from '../../icons/Reset';
import { SMALL, MEDIUM } from '../../constants';
import { GridOptions } from '../../entities';
import styles from './Toolkit.module.css';

interface ToolkitType {}

const Toolkit: FC<ToolkitType> = () => {
  const handleReset = () => {};

  const handleTooltip = () => {};

  return (
    <div className={styles.wrapper}>
      <button type="button" className={styles.button}>
        <Reset />
      </button>
      <button type="button" className={styles.button}>
        <span className={styles.tooltip}>?</span>
      </button>
    </div>
  );
};

export default Toolkit;
