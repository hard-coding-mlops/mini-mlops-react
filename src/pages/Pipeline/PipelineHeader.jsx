import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import styles from './Pipeline.module.css';

function calculateTimeLeft() {
  // 서울 기준 다음 날 오전 9시 30분
  const targetTime = new Date();
  targetTime.setDate(targetTime.getDate() + 1);
  targetTime.setHours(9, 30, 0, 0);

  // 현재 시간
  const currentTime = new Date();

  // 남은 시간 계산
  const timeDifference = targetTime - currentTime;

  // 시, 분, 초 계산
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // 시간 형식으로 포맷팅
  return `${String(hours).padStart(2, '0')}시 ${String(minutes).padStart(2, '0')}분 ${String(seconds).padStart(
    2,
    '0',
  )}초`;
}

function PipelineHeader() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft);
    }, 1000); // 1초마다 업데이트

    // 컴포넌트 언마운트 시 clearInterval을 통해 interval 정리
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.pipeline}>
      <PageHeader>{timeLeft} 뒤에 시작합니다.</PageHeader>
    </div>
  );
}

export default PipelineHeader;
