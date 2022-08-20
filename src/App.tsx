import React, { useEffect } from 'react';
import { useUpdateAtom, useResetAtom } from 'jotai/utils';

import { gridOptionsAtom, gridAtom } from './atoms';
import { SMALL, MEDIUM } from './constants';
import Header from './components/Header';
import Grid from './components/Grid';

import styles from './App.module.css';

const App = () => {
  const setGridOptions = useUpdateAtom(gridOptionsAtom);
  const resetGrid = useResetAtom(gridAtom);

  useEffect(() => {
    window.addEventListener('resize', setGridSize);
    return () => window.removeEventListener('resize', setGridSize);
  });

  const setGridSize = () => {
    window.innerWidth < 680 ? setGridOptions({ ...SMALL }) : setGridOptions({ ...MEDIUM });
    resetGrid();
  };

  return (
    <main className={styles.app}>
      <section>
        <Header />
        {/* <Toolkit /> */}
        <Grid />
      </section>
    </main>
  );
};

export default App;
