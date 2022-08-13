import React, { useEffect, useState } from 'react';

import { SMALL, MEDIUM } from './constants';
import Header from './components/Header';
import Grid from './components/Grid';

import styles from './App.module.css';

const App = () => {
  const [options, setOptions] = useState({ gridSize: 16, totalMines: 40 });
  const [flagCount, setFlagCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);

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
        <Header isGameOver={gameOver} flagCount={flagCount} mineCount={options.totalMines} />
        <Grid
          {...options}
          isGameOver={gameOver}
          setGameOver={setGameOver}
          updateFlagCount={setFlagCount}
        />
      </section>
    </main>
  );
};

export default App;
