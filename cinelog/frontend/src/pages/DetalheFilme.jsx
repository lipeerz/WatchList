import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { filmesService } from '../services/api';
import Toast from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';
import styles from './DetalheFilme.module.css';

const POSTER_FALLBACK = 'https://via.placeholder.com/300x450/0e1421/3b82f6?text=Sem+Poster';

export default function DetalheFilme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);

  useEffect(() => {
    const carregar = async () => {
      setLoading(true);
      try {
        const res = await filmesService.buscar(id);
        setFilme(res.data);
      } catch (err) {
        setErro(err.mensagem || 'Filme não encontrado');
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, [id]);

  const handleDelete = async () => {
    try {
      await filmesService.deletar(id);
      setToast({ mensagem: 'Filme removido.', tipo: 'sucesso' });
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setToast({ mensagem: err.mensagem || 'Erro ao remover.', tipo: 'erro' });
    }
    setConfirmModal(false);
  };

  const notaColor = filme?.nota >= 8 ? '#22c55e' : filme?.nota >= 6 ? '#f59e0b' : '#ef4444';
  const notaLabel = filme?.nota >= 8 ? 'Excelente' : filme?.nota >= 6 ? 'Bom' : 'Regular';

  if (loading) return (
    <div className={styles.centro}><div className="loading-spinner" /></div>
  );

  if (erro) return (
    <div className={styles.centro}>
      <p className={styles.erroMsg}>{erro}</p>
      <Link to="/" className={styles.voltar}>← Voltar</Link>
    </div>
  );

  return (
    <div className={styles.page}>
      <div className="container">
        <Link to="/" className={styles.voltar}>← Voltar para filmoteca</Link>

        <div className={styles.layout}>
          {/* Poster */}
          <div className={styles.posterCol}>
            <div className={styles.posterWrapper}>
              <img
                src={filme.poster_url || POSTER_FALLBACK}
                alt={filme.titulo}
                className={styles.poster}
                onError={e => { e.target.src = POSTER_FALLBACK; }}
              />
            </div>

            <div className={styles.notaCard}>
              <span className={styles.notaNum} style={{ color: notaColor }}>
                {Number(filme.nota).toFixed(1)}
              </span>
              <div>
                <div className={styles.notaLabel} style={{ color: notaColor }}>{notaLabel}</div>
                <div className={styles.notaSub}>de 10</div>
              </div>
            </div>

            <div className={styles.actions}>
              <Link to={`/editar/${filme.id}`} className={styles.btnEdit}>Editar filme</Link>
              <button className={styles.btnDelete} onClick={() => setConfirmModal(true)}>Remover</button>
            </div>
          </div>

          {/* Info */}
          <div className={styles.infoCol}>
            <div className={styles.metaTop}>
              <span className={styles.genero}>{filme.genero}</span>
              {filme.assistido ? (
                <span className={styles.badgeAssistido}>✓ Assistido</span>
              ) : (
                <span className={styles.badgePendente}>Na lista</span>
              )}
            </div>

            <h1 className={styles.titulo}>{filme.titulo}</h1>
            <p className={styles.diretor}>Dirigido por <strong>{filme.diretor}</strong></p>

            <div className={styles.detalhes}>
              <div className={styles.detalheItem}>
                <span className={styles.detalheLabel}>Ano</span>
                <span className={styles.detalheValor}>{filme.ano_lancamento}</span>
              </div>
              <div className={styles.detalheItem}>
                <span className={styles.detalheLabel}>Gênero</span>
                <span className={styles.detalheValor}>{filme.genero}</span>
              </div>
              <div className={styles.detalheItem}>
                <span className={styles.detalheLabel}>Status</span>
                <span className={styles.detalheValor}>{filme.assistido ? 'Assistido' : 'Pendente'}</span>
              </div>
            </div>

            {filme.sinopse && (
              <div className={styles.sinopse}>
                <h3 className={styles.sinopseTitulo}>Sinopse</h3>
                <p className={styles.sinopseTexto}>{filme.sinopse}</p>
              </div>
            )}

            <p className={styles.data}>
              Adicionado em {new Date(filme.created_at).toLocaleDateString('pt-BR', {
                day: '2-digit', month: 'long', year: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>

      {toast && <Toast mensagem={toast.mensagem} tipo={toast.tipo} onClose={() => setToast(null)} />}
      {confirmModal && (
        <ConfirmModal
          titulo="Remover filme"
          mensagem={`Tem certeza que deseja remover "${filme.titulo}"?`}
          onConfirm={handleDelete}
          onCancel={() => setConfirmModal(false)}
        />
      )}
    </div>
  );
}
