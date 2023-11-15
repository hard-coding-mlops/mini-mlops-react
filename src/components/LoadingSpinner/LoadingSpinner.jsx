// mini-mlops-react/src/components/LoadingSpinner/LoadingSpinner.jsx
import React from 'react';
import styles from './LoadingSpinner.module.css'; // CSS 파일을 불러옵니다.

function LoadingSpinner({ spinnerStyle }) {
  return (
    <div className={styles.loadingSpinnerContainer} style={{ ...spinnerStyle }}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
}

export default LoadingSpinner;
