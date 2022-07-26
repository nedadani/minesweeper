import React, { FC } from 'react';

import { CellTypes } from '../../entities';
import './Cell.css';

const Cell: FC<CellTypes> = () => {
  return <span className="cell-wrapper"></span>;
};

export default Cell;
