import { useEffect } from 'react';
import styles from './Toast.module.css';

export default function Toast({ mensagem, tipo = 'sucesso', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.toast} ${styles[tipo]}`}>
      <span className={styles.icon}>
        {tipo === 'sucesso' ? '✓' : tipo === 'erro' ? '✕' : 'ℹ'}
      </span>
      <span className={styles.msg}>{mensagem}</span>
      <button className={styles.close} onClick={onClose}>×</button>
    </div>
  );
}
