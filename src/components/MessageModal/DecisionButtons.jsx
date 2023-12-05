import styles from './MessageModal.module.css';

function DecisionButtons({ handleYes, handleNo }) {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.buttons} onClick={handleYes}>
        Y
      </button>
      <button className={styles.buttons} onClick={handleNo}>
        N
      </button>
    </div>
  );
}

export default DecisionButtons;
