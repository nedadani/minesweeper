import React, { FC } from 'react';

import './Cell.css';

interface CellTypes {
  coords: { x: number; y: number };
}

const Cell: FC<CellTypes> = () => {
  return <span className="cell-wrapper"></span>;
};

export default Cell;
