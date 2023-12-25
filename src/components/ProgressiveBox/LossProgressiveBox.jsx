// import React from 'react';
import { ceilToOne } from '../../utils/formatters';

import styles from './ProgressiveBox.module.css';

function ProgressiveBox({ item, percentage }) {
    return (
        <div className={styles.boxContainer}>
            {percentage * 20 > 50 ? (
                <div
                    className={styles.progressiveContainer}
                    style={{
                        width: `${percentage * 20}%`,
                        backgroundColor: item === 'accuracy' ? '#FF6B6B' : '#F4B400',
                    }}
                >
                    <span className={styles.value}>{percentage.toFixed(2)}&nbsp;</span>
                </div>
            ) : percentage * 20 < 1 ? (
                <>
                    <span className={styles.value} style={{ color: 'black' }}>
                        &nbsp;&lt; 0.1&nbsp;
                    </span>
                </>
            ) : (
                <>
                    <div
                        className={styles.progressiveContainer}
                        style={{
                            width: `${percentage * 20}%`,
                            maxWidth: '100%',
                            backgroundColor: item === 'accuracy' ? '#FF6B6B' : '#F4B400',
                        }}
                    ></div>
                    <span className={styles.value} style={{ color: 'black' }}>
                        {percentage.toFixed(2)}&nbsp;
                    </span>
                </>
            )}
        </div>
    );
}

export default ProgressiveBox;
