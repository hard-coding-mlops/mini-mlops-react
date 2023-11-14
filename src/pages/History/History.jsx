// History.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import HistoryBar from '../../components/HistoryBar/HistoryBar';
import styles from './History.module.css';

const dummydata = [
  { id: 1, datetime: '2023-08-01 09:30:00', accuracy: 0.9 },
  { id: 2, datetime: '2023-08-02 09:30:00', accuracy: 0.9 },
  { id: 3, datetime: '2023-08-03 09:30:00', accuracy: 0.9 },
  { id: 4, datetime: '2023-08-04 09:30:00', accuracy: 0.9 },
  { id: 5, datetime: '2023-08-05 09:30:00', accuracy: 0.9 },
  { id: 6, datetime: '2023-08-06 09:30:00', accuracy: 0.9 },
  { id: 7, datetime: '2023-08-07 09:30:00', accuracy: 0.9 },
  { id: 8, datetime: '2023-08-08 09:30:00', accuracy: 0.9 },
  { id: 9, datetime: '2023-08-09 09:30:00', accuracy: 0.9 },
  { id: 10, datetime: '2023-08-10 09:30:00', accuracy: 0.9 },
  { id: 11, datetime: '2023-08-11 09:30:00', accuracy: 0.9 },
  { id: 12, datetime: '2023-08-12 09:30:00', accuracy: 0.9 },
  { id: 13, datetime: '2023-08-13 09:30:00', accuracy: 0.9 },
  { id: 14, datetime: '2023-08-14 09:30:00', accuracy: 0.9 },
  { id: 15, datetime: '2023-08-15 09:30:00', accuracy: 0.9 },
  { id: 16, datetime: '2023-08-16 09:30:00', accuracy: 0.9 },
  { id: 17, datetime: '2023-08-17 09:30:00', accuracy: 0.9 },
  { id: 18, datetime: '2023-08-18 09:30:00', accuracy: 0.9 },
  { id: 19, datetime: '2023-08-19 09:30:00', accuracy: 0.9 },
  { id: 20, datetime: '2023-08-20 09:30:00', accuracy: 0.9 },
  { id: 21, datetime: '2023-08-21 09:30:00', accuracy: 0.9 },
  { id: 22, datetime: '2023-08-22 09:30:00', accuracy: 0.9 },
  { id: 23, datetime: '2023-08-23 09:30:00', accuracy: 0.9 },
  { id: 24, datetime: '2023-08-24 09:30:00', accuracy: 0.9 },
  { id: 25, datetime: '2023-08-25 09:30:00', accuracy: 0.9 },
  { id: 26, datetime: '2023-08-26 09:30:00', accuracy: 0.9 },
  { id: 27, datetime: '2023-08-27 09:30:00', accuracy: 0.9 },
  { id: 28, datetime: '2023-08-28 09:30:00', accuracy: 0.9 },
  { id: 29, datetime: '2023-08-29 09:30:00', accuracy: 0.9 },
  { id: 30, datetime: '2023-08-30 09:30:00', accuracy: 0.9 },
  { id: 31, datetime: '2023-08-31 09:30:00', accuracy: 0.9 },
  { id: 32, datetime: '2023-09-01 09:30:00', accuracy: 0.9 },
  { id: 33, datetime: '2023-09-02 09:30:00', accuracy: 0.9 },
  { id: 34, datetime: '2023-09-03 09:30:00', accuracy: 0.9 },
  { id: 35, datetime: '2023-09-04 09:30:00', accuracy: 0.9 },
  { id: 36, datetime: '2023-09-05 09:30:00', accuracy: 0.9 },
  { id: 37, datetime: '2023-09-06 09:30:00', accuracy: 0.9 },
  { id: 38, datetime: '2023-09-07 09:30:00', accuracy: 0.9 },
  { id: 39, datetime: '2023-09-08 09:30:00', accuracy: 0.9 },
];

function History() {
  const { recordId } = useParams();
  const [currentRecordId, setCurrentRecordId] = useState(1);

  useEffect(() => {
    // URL 파라미터에서 읽은 값이 있으면 해당 값으로 설정
    if (recordId) {
      setCurrentRecordId(parseInt(recordId, 10));
    }
  }, [recordId]);

  return (
    <>
      <HistoryBar data={dummydata} currentRecordId={currentRecordId} setCurrentRecordId={setCurrentRecordId} />

      <div className={styles.history}>
        <div className={styles.historyPageHeader}>
          <PageHeader>
            <span>{dummydata[currentRecordId - 1].datetime} 학습 기록 모델 성능 평가</span>
          </PageHeader>
        </div>
        <div className={styles.historyPageBody}>대충 id:{currentRecordId} 관련 표 여러 개</div>
      </div>
    </>
  );
}

export default History;
