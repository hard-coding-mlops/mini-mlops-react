// HistoryBar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HistoryBar.module.css';

function HistoryBar({ data, currentRecordId, setCurrentRecordId }) {
  const navigate = useNavigate();

  return (
    <div className={styles.historyBar}>
      <p className={styles.recordHeader}>학습 기록</p>
      <div className={styles.recordBody}>
        {data.map((item) => (
          <div className={styles.record} key={item.id}>
            <button
              className={`${styles.recordButton} ${currentRecordId === item.id ? styles.activeButton : ''}`}
              onClick={() => {
                setCurrentRecordId(item.id);
                navigate(`/history/${item.id}`);
              }}
            >
              {item.datetime}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryBar;
