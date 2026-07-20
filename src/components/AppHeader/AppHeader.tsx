import styles from './AppHeader.module.css';

export function AppHeader() {
  return (
    <header className={styles.header}>
      <div>
        <p className={styles.kicker}>自然發音冒險島</p>
        <h1 className={styles.title}>Phonics Adventure</h1>
      </div>
    </header>
  );
}
