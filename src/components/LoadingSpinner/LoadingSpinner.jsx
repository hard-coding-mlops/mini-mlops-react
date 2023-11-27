import styles from './LoadingSpinner.module.css';

function LoadingSpinner({ spinnerStyle }) {
  return (
    <div className={styles.loadingSpinnerContainer} style={{ ...spinnerStyle }}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
}

export default LoadingSpinner;
