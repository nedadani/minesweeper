import React, { FC } from 'react';
import { isEqual } from 'lodash';
import { useAtomValue } from 'jotai';
import clsx from 'clsx';

import { gridAtom, gridOptionsAtom } from '../../atoms';
import { useContextMenuHandler, useClickHandler } from '../../utils';
import { SMALL, MEDIUM } from '../../constants';
import Cell from '../Cell';

import styles from './Grid.module.css';

const Grid: FC = () => {
  const { handleContextMenuClick, handleTouch } = useContextMenuHandler();
  const { handleClick } = useClickHandler();
  const gridOptions = useAtomValue(gridOptionsAtom);
  const grid = useAtomValue(gridAtom);

  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.mobileGrid]: isEqual(gridOptions, SMALL),
        [styles.desktopGrid]: isEqual(gridOptions, MEDIUM),
      })}
      onClick={handleClick}
      onContextMenu={handleContextMenuClick}
      onTouchStart={(e) => handleTouch(e, 'start')}
      onTouchEnd={(e) => handleTouch(e, 'end')}
    >
      {grid.map((row, xIdx) =>
        row.map((cell, yIdx) => <Cell key={`${xIdx}-${yIdx}`} x={xIdx} y={yIdx} {...cell} />)
      )}
    </div>
  );
};

export default Grid;
