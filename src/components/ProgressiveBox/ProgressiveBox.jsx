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
                        width: `${percentage * 100}%`,
                        backgroundColor: '#FF6B6B',
                    }}
                >
                    <span className={styles.value}>{ceilToOne(percentage * 100)}%&nbsp;</span>
                </div>
            ) : (
                <>
                    <div
                        className={styles.progressiveContainer}
                        style={{
                            width: `${percentage * 100}%`,
                            maxWidth: '100%',
                            backgroundColor: '#FFA500',
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
