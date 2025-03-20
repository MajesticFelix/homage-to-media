import { useState } from 'react';
import Head from 'next/head';
import Sculpture from '../components/Sculpture';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [started, setStarted] = useState(false);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Homage to Media</title>
        <meta name="description" content="A digital reinterpretation of Jean Tinguely's self-destructing sculpture" />
      </Head>

      <main className={styles.main}>
        {!started ? (
          <div className={styles.intro}>
            <h1>Homage to Media</h1>
            <p>A digital reinterpretation of Jean Tinguely's 1960 self-destructing sculpture</p>
            <button className={styles.startButton} onClick={() => setStarted(true)}>
              Begin Experience
            </button>
          </div>
        ) : (
          <Sculpture />
        )}
      </main>
    </div>
  );
}
