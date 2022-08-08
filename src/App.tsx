import React, { useEffect, useState } from 'react';

import { SMALL, MEDIUM } from './constants';
import Grid from './components/Grid';

import styles from './App.module.css';

const App = () => {
  const [options, setOptions] = useState({ gridSize: 16, mineCount: 40 });

  useEffect(() => setGridSize, []);

  useEffect(() => {
    window.addEventListener('resize', setGridSize);
    return () => window.removeEventListener('resize', setGridSize);
  });

  const setGridSize = () => {
    window.innerWidth < 680 ? setOptions(SMALL) : setOptions(MEDIUM);
  };

  return (
    <main className={styles.app}>
      <section>
        <Grid {...options} />
      </section>
    </main>
  );
};

export default App;
