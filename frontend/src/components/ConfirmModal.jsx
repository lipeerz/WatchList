import styles from './ConfirmModal.module.css';

export default function ConfirmModal({ titulo, mensagem, onConfirm, onCancel }) {
  return (
    <div className={styles.backdrop} onClick={onCancel}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h3 className={styles.titulo}>{titulo}</h3>
        <p className={styles.mensagem}>{mensagem}</p>
        <div className={styles.actions}>
          <button className={styles.btnCancel} onClick={onCancel}>Cancelar</button>
          <button className={styles.btnConfirm} onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}
