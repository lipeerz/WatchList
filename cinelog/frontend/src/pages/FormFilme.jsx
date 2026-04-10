import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { filmesService } from '../services/api';
import Toast from '../components/Toast';
import styles from './FormFilme.module.css';

const CAMPOS_INICIAIS = {
  titulo: '',
  diretor: '',
  ano_lancamento: '',
  genero: '',
  nota: '',
  sinopse: '',
  poster_url: '',
  assistido: false,
};

export default function FormFilme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(CAMPOS_INICIAIS);
  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingDados, setLoadingDados] = useState(isEdit);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!isEdit) return;
    const carregar = async () => {
      try {
        const res = await filmesService.buscar(id);
        const f = res.data;
        setForm({
          titulo: f.titulo || '',
          diretor: f.diretor || '',
          ano_lancamento: f.ano_lancamento || '',
          genero: f.genero || '',
          nota: f.nota !== undefined ? String(f.nota) : '',
          sinopse: f.sinopse || '',
          poster_url: f.poster_url || '',
          assistido: Boolean(f.assistido),
        });
      } catch {
        setToast({ mensagem: 'Erro ao carregar dados do filme.', tipo: 'erro' });
      } finally {
        setLoadingDados(false);
      }
    };
    carregar();
  }, [id, isEdit]);

  const validar = () => {
    const e = {};
    if (!form.titulo.trim()) e.titulo = 'Título é obrigatório';
    if (!form.diretor.trim()) e.diretor = 'Diretor é obrigatório';
    if (!form.ano_lancamento || isNaN(form.ano_lancamento) || form.ano_lancamento < 1888 || form.ano_lancamento > new Date().getFullYear() + 5)
      e.ano_lancamento = `Ano deve ser entre 1888 e ${new Date().getFullYear() + 5}`;
    if (!form.genero.trim()) e.genero = 'Gênero é obrigatório';
    if (form.nota === '' || isNaN(form.nota) || form.nota < 0 || form.nota > 10)
      e.nota = 'Nota deve ser entre 0 e 10';
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (erros[name]) setErros(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errosValidacao = validar();
    if (Object.keys(errosValidacao).length > 0) {
      setErros(errosValidacao);
      return;
    }

    setLoading(true);
    const payload = {
      ...form,
      ano_lancamento: parseInt(form.ano_lancamento),
      nota: parseFloat(form.nota),
      assistido: form.assistido ? 1 : 0,
    };

    try {
      if (isEdit) {
        await filmesService.atualizar(id, payload);
        setToast({ mensagem: 'Filme atualizado com sucesso!', tipo: 'sucesso' });
      } else {
        await filmesService.criar(payload);
        setToast({ mensagem: 'Filme adicionado com sucesso!', tipo: 'sucesso' });
      }
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setToast({ mensagem: err.mensagem || 'Erro ao salvar filme.', tipo: 'erro' });
    } finally {
      setLoading(false);
    }
  };

  if (loadingDados) {
    return <div className={styles.centro}><div className="loading-spinner" /></div>;
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <Link to={isEdit ? `/filme/${id}` : '/'} className={styles.voltar}>
          ← {isEdit ? 'Voltar ao filme' : 'Voltar para filmoteca'}
        </Link>

        <div className={styles.header}>
          <h1 className={styles.titulo}>
            {isEdit ? 'Editar Filme' : 'Novo Filme'}
          </h1>
          <p className={styles.subtitulo}>
            {isEdit ? 'Atualize as informações do filme' : 'Adicione um filme à sua coleção'}
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.grid2}>
            <div className={styles.campo}>
              <label className={styles.label}>Título *</label>
              <input
                type="text"
                name="titulo"
                value={form.titulo}
                onChange={handleChange}
                placeholder="Ex: Clube da Luta"
                className={`${styles.input} ${erros.titulo ? styles.inputErro : ''}`}
              />
              {erros.titulo && <span className={styles.erroMsg}>{erros.titulo}</span>}
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Diretor *</label>
              <input
                type="text"
                name="diretor"
                value={form.diretor}
                onChange={handleChange}
                placeholder="Ex: David Fincher"
                className={`${styles.input} ${erros.diretor ? styles.inputErro : ''}`}
              />
              {erros.diretor && <span className={styles.erroMsg}>{erros.diretor}</span>}
            </div>
          </div>

          <div className={styles.grid3}>
            <div className={styles.campo}>
              <label className={styles.label}>Ano de Lançamento *</label>
              <input
                type="number"
                name="ano_lancamento"
                value={form.ano_lancamento}
                onChange={handleChange}
                placeholder="Ex: 1999"
                min="1888"
                max={new Date().getFullYear() + 5}
                className={`${styles.input} ${erros.ano_lancamento ? styles.inputErro : ''}`}
              />
              {erros.ano_lancamento && <span className={styles.erroMsg}>{erros.ano_lancamento}</span>}
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Gênero *</label>
              <input
                type="text"
                name="genero"
                value={form.genero}
                onChange={handleChange}
                placeholder="Ex: Drama/Thriller"
                className={`${styles.input} ${erros.genero ? styles.inputErro : ''}`}
              />
              {erros.genero && <span className={styles.erroMsg}>{erros.genero}</span>}
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Nota (0–10) *</label>
              <input
                type="number"
                name="nota"
                value={form.nota}
                onChange={handleChange}
                placeholder="Ex: 9.5"
                min="0"
                max="10"
                step="0.1"
                className={`${styles.input} ${erros.nota ? styles.inputErro : ''}`}
              />
              {erros.nota && <span className={styles.erroMsg}>{erros.nota}</span>}
            </div>
          </div>

          <div className={styles.campo}>
            <label className={styles.label}>URL do Poster</label>
            <input
              type="url"
              name="poster_url"
              value={form.poster_url}
              onChange={handleChange}
              placeholder="https://image.tmdb.org/t/p/w500/..."
              className={styles.input}
            />
          </div>

          <div className={styles.campo}>
            <label className={styles.label}>Sinopse</label>
            <textarea
              name="sinopse"
              value={form.sinopse}
              onChange={handleChange}
              placeholder="Descreva o filme..."
              rows={4}
              className={styles.textarea}
            />
          </div>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="assistido"
              checked={form.assistido}
              onChange={handleChange}
              className={styles.checkbox}
            />
            <span className={styles.checkmark}>{form.assistido ? '✓' : ''}</span>
            <span>Já assisti este filme</span>
          </label>

          {/* Preview do poster */}
          {form.poster_url && (
            <div className={styles.preview}>
              <p className={styles.previewLabel}>Preview do poster</p>
              <img
                src={form.poster_url}
                alt="Preview"
                className={styles.previewImg}
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>
          )}

          <div className={styles.formActions}>
            <Link to={isEdit ? `/filme/${id}` : '/'} className={styles.btnCancel}>
              Cancelar
            </Link>
            <button type="submit" className={styles.btnSalvar} disabled={loading}>
              {loading ? 'Salvando...' : isEdit ? 'Salvar alterações' : 'Adicionar filme'}
            </button>
          </div>
        </form>
      </div>

      {toast && <Toast mensagem={toast.mensagem} tipo={toast.tipo} onClose={() => setToast(null)} />}
    </div>
  );
}
