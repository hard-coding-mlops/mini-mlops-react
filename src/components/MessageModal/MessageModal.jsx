import styles from './MessageModal.module.css';

function MessageModal({ children }) {
  return (
    <div className={styles.wholeScreen}>
      <div className={styles.messageModal}>{children}</div>
    </div>
  );
}

export default MessageModal;
