import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>◈</span>
          <span className={styles.logoText}>WatchList</span>
        </Link>

        <div className={styles.links}>
          <Link to="/" className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}>
            Filmes
          </Link>
          <Link to="/sobre" className={`${styles.link} ${location.pathname === '/sobre' ? styles.active : ''}`}>
            Sobre
          </Link>
          <Link to="/novo" className={styles.btnAdd}>
            + Adicionar
          </Link>
        </div>
      </div>
    </nav>
  );
}
