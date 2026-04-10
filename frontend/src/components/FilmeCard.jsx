import { Link } from 'react-router-dom';
import styles from './FilmeCard.module.css';

const POSTER_FALLBACK = 'https://via.placeholder.com/300x450/0e1421/3b82f6?text=Sem+Poster';

export default function FilmeCard({ filme, onDelete }) {
  const notaColor = filme.nota >= 8 ? '#22c55e' : filme.nota >= 6 ? '#f59e0b' : '#ef4444';

  return (
    <div className={styles.card}>
      <Link to={`/filme/${filme.id}`} className={styles.posterLink}>
        <div className={styles.posterWrapper}>
          <img
            src={filme.poster_url || POSTER_FALLBACK}
            alt={filme.titulo}
            className={styles.poster}
            onError={(e) => { e.target.src = POSTER_FALLBACK; }}
          />
          <div className={styles.overlay}>
            <span className={styles.verDetalhes}>Ver detalhes →</span>
          </div>
        </div>
      </Link>

      <div className={styles.info}>
        <div className={styles.meta}>
          <span className={styles.ano}>{filme.ano_lancamento}</span>
          {filme.assistido ? (
            <span className={styles.badge}>✓ assistido</span>
          ) : (
            <span className={`${styles.badge} ${styles.badgePendente}`}>· na lista</span>
          )}
        </div>

        <Link to={`/filme/${filme.id}`} className={styles.titulo}>
          {filme.titulo}
        </Link>

        <p className={styles.diretor}>{filme.diretor}</p>

        <div className={styles.bottom}>
          <span className={styles.genero}>{filme.genero}</span>
          <span className={styles.nota} style={{ color: notaColor }}>
            ★ {Number(filme.nota).toFixed(1)}
          </span>
        </div>

        <div className={styles.actions}>
          <Link to={`/editar/${filme.id}`} className={styles.btnEdit}>
            Editar
          </Link>
          <button
            className={styles.btnDelete}
            onClick={() => onDelete(filme.id, filme.titulo)}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
