import { useState, useEffect, useCallback } from 'react';
import { filmesService } from '../services/api';
import FilmeCard from '../components/FilmeCard';
import Pagination from '../components/Pagination';
import Toast from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';
import styles from './ListaFilmes.module.css';

const GENEROS = ['Ação', 'Drama', 'Comédia', 'Terror', 'Ficção Científica', 'Thriller', 'Romance', 'Animação', 'Documentário', 'Crime'];

export default function ListaFilmes() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [busca, setBusca] = useState('');
  const [buscaInput, setBuscaInput] = useState('');
  const [generoFiltro, setGeneroFiltro] = useState('');
  const [toast, setToast] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);

  const carregarFilmes = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      const res = await filmesService.listar({ page, limit: 8, busca, genero: generoFiltro });
      setFilmes(res.data.filmes);
      setTotalPages(res.data.totalPages);
      setTotal(res.data.total);
    } catch (err) {
      setErro(err.mensagem || 'Erro ao carregar filmes');
    } finally {
      setLoading(false);
    }
  }, [page, busca, generoFiltro]);

  useEffect(() => {
    carregarFilmes();
  }, [carregarFilmes]);

  const handleBusca = (e) => {
    e.preventDefault();
    setBusca(buscaInput);
    setPage(1);
  };

  const handleGenero = (g) => {
    setGeneroFiltro(prev => prev === g ? '' : g);
    setPage(1);
  };

  const handleDelete = (id, titulo) => {
    setConfirmModal({ id, titulo });
  };

  const confirmarDelete = async () => {
    try {
      await filmesService.deletar(confirmModal.id);
      setToast({ mensagem: `"${confirmModal.titulo}" removido com sucesso.`, tipo: 'sucesso' });
      setConfirmModal(null);
      carregarFilmes();
    } catch (err) {
      setToast({ mensagem: err.mensagem || 'Erro ao remover filme.', tipo: 'erro' });
      setConfirmModal(null);
    }
  };

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.titulo}>Sua Filmoteca</h1>
            <p className={styles.subtitulo}>
              {total > 0 ? `${total} filme${total !== 1 ? 's' : ''} registrado${total !== 1 ? 's' : ''}` : 'Nenhum filme ainda'}
            </p>
          </div>
        </div>

        {/* Search bar */}
        <form className={styles.searchBar} onSubmit={handleBusca}>
          <input
            type="text"
            placeholder="Buscar por título ou diretor..."
            value={buscaInput}
            onChange={e => setBuscaInput(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchBtn}>Buscar</button>
          {(busca || generoFiltro) && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => { setBusca(''); setBuscaInput(''); setGeneroFiltro(''); setPage(1); }}
            >
              Limpar
            </button>
          )}
        </form>

        {/* Genre filters */}
        <div className={styles.generos}>
          {GENEROS.map(g => (
            <button
              key={g}
              className={`${styles.generoBtn} ${generoFiltro === g ? styles.generoAtivo : ''}`}
              onClick={() => handleGenero(g)}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className={styles.centro}>
            <div className="loading-spinner" />
          </div>
        ) : erro ? (
          <div className={styles.centro}>
            <div className={styles.erroBox}>
              <p className={styles.erroIcon}>✕</p>
              <p className={styles.erroMsg}>{erro}</p>
              <button className={styles.retryBtn} onClick={carregarFilmes}>Tentar novamente</button>
            </div>
          </div>
        ) : filmes.length === 0 ? (
          <div className={styles.centro}>
            <p className={styles.vazio}>◈</p>
            <p className={styles.vazioMsg}>Nenhum filme encontrado.</p>
            <p className={styles.vazioSub}>Tente outra busca ou adicione um novo filme.</p>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {filmes.map(f => (
                <FilmeCard key={f.id} filme={f} onDelete={handleDelete} />
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          mensagem={toast.mensagem}
          tipo={toast.tipo}
          onClose={() => setToast(null)}
        />
      )}

      {/* Confirm Modal */}
      {confirmModal && (
        <ConfirmModal
          titulo="Remover filme"
          mensagem={`Tem certeza que deseja remover "${confirmModal.titulo}"? Esta ação não pode ser desfeita.`}
          onConfirm={confirmarDelete}
          onCancel={() => setConfirmModal(null)}
        />
      )}
    </div>
  );
}
