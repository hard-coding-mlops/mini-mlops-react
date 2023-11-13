// mini-mlops-react/src/components/LoadingSpinner/LoadingSpinner.jsx
import React from 'react';
import styles from './LoadingSpinner.module.css'; // CSS 파일을 불러옵니다.

function LoadingSpinner() {
  return (
    // <div className='loading-spinner-container'>
    //   <div className='loading-spinner'></div>
    // </div>
    <div className={styles.loadingSpinnerContainer}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
}

export default LoadingSpinner;
