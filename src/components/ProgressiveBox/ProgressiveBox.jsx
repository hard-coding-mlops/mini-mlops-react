// import React from 'react';
import { ceilToOne } from '../../utils/formatters';

import styles from './ProgressiveBox.module.css';

function ProgressiveBox({ item, percentage }) {
  return (
    <div className={styles.boxContainer}>
      {percentage * 100 > 50 ? (
        <div
          className={styles.progressiveContainer}
          style={{
            width: `${percentage * 100}%`,
            backgroundColor: item === 'accuracy' ? '#FF6B6B' : '#FFA500',
          }}
        >
          <span className={styles.value}>{ceilToOne(percentage * 100)}%&nbsp;</span>
        </div>
      ) : percentage * 100 < 1 ? (
        <>
          <span className={styles.value} style={{ color: 'black' }}>
            &nbsp;&lt; 1%&nbsp;
          </span>
        </>
      ) : (
        <>
          <div
            className={styles.progressiveContainer}
            style={{
              width: `${percentage * 100}%`,
              maxWidth: '100%',
              backgroundColor: item === 'accuracy' ? '#FF6B6B' : '#FFA500',
            }}
          ></div>
          <span className={styles.value} style={{ color: 'black' }}>
            {ceilToOne(percentage * 100)}%&nbsp;
          </span>
        </>
      )}
    </div>
  );
}

export default ProgressiveBox;
