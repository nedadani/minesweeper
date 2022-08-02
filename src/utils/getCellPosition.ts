import { SyntheticEvent } from 'react';

const getCellPosition = (e: SyntheticEvent): { x: number; y: number } => {
  const x = Number((e.target as HTMLSpanElement).attributes[1].value);
  const y = Number((e.target as HTMLSpanElement).attributes[2].value);

  return { x, y };
};

export { getCellPosition };
