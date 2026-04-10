import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.name}>Alan Filipe Reginato</span>
        <span className={styles.divider}>·</span>
        <span className={styles.copy}>WatchList © {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
