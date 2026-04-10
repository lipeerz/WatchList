import styles from './Sobre.module.css';

export default function Sobre() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.card}>
          <div className={styles.icon}>◈</div>
          <h1 className={styles.appNome}>WatchList</h1>
          <p className={styles.tagline}>Sua coleção pessoal de cinema</p>

          <div className={styles.divider} />

          <div className={styles.alunoSection}>
            <p className={styles.alunoLabel}>Desenvolvido por</p>
            <p className={styles.alunoNome}>Alan Filipe Reginato</p>
          </div>

          <div className={styles.divider} />

          <div className={styles.stack}>
            <h3 className={styles.stackTitulo}>Stack utilizada</h3>
            <div className={styles.stackGrid}>
              <div className={styles.stackItem}>
                <span className={styles.stackIcon}>⚛</span>
                <div>
                  <p className={styles.stackNome}>React</p>
                  <p className={styles.stackDesc}>Frontend com React Router e CSS Modules</p>
                </div>
              </div>
              <div className={styles.stackItem}>
                <span className={styles.stackIcon}>⬡</span>
                <div>
                  <p className={styles.stackNome}>Node.js + Express</p>
                  <p className={styles.stackDesc}>API RESTful com endpoints CRUD completos</p>
                </div>
              </div>
              <div className={styles.stackItem}>
                <span className={styles.stackIcon}>◫</span>
                <div>
                  <p className={styles.stackNome}>MySQL</p>
                  <p className={styles.stackDesc}>Banco de dados relacional com tabela de filmes</p>
                </div>
              </div>
              <div className={styles.stackItem}>
                <span className={styles.stackIcon}>⇄</span>
                <div>
                  <p className={styles.stackNome}>Axios</p>
                  <p className={styles.stackDesc}>Comunicação HTTP entre frontend e backend</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.features}>
            <h3 className={styles.stackTitulo}>Funcionalidades</h3>
            <ul className={styles.featureList}>
              <li>✓ Listagem de filmes com paginação</li>
              <li>✓ Busca por título ou diretor</li>
              <li>✓ Filtro por gênero</li>
              <li>✓ Cadastro, edição e exclusão de filmes</li>
              <li>✓ Visualização detalhada de cada filme</li>
              <li>✓ Marcação de filmes assistidos</li>
              <li>✓ Validação de formulários</li>
              <li>✓ Tratamento de erros com feedback visual</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
