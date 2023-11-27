// import React from 'react';
import { ceilToOne } from '../../utils/formatters';

import styles from './ProgressiveBox.module.css';

function ProgressiveBox({ item, percentage }) {
  return (
    <div className={styles.boxContainer}>
      {item === 'accuracy' ? (
        <div
          className={styles.progressiveContainer}
          style={{
            width: `${percentage}%`,
            backgroundColor: '#FF6B6B',
          }}
        >
          <span className={styles.value}>{ceilToOne(percentage)}%&nbsp;</span>
        </div>
      ) : (
        <>
          <div
            className={styles.progressiveContainer}
            style={{
              width: `${percentage}%`,
              backgroundColor: '#FFA500',
            }}
          ></div>
          <span className={styles.value} style={{ color: 'black' }}>
            {ceilToOne(percentage)}%&nbsp;
          </span>
        </>
      )}
    </div>
  );
}

export default ProgressiveBox;
