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

function PipelineHeader({ currentProcess }) {
  const [restart, setRestart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft);
    }, 1000);

    // 컴포넌트가 언마운트되면 clearInterval을 통해 interval 정리
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (currentProcess === 5) {
      // Set restart after 10 minutes
      const timeoutId = setTimeout(() => {
        setRestart(true);
      }, 10 * 60 * 1000); // 10 minutes in milliseconds

      return () => clearTimeout(timeoutId);
    }
  }, [currentProcess]);

  const processLabel = (processNumber) => {
    if (processNumber === 1) return '데이터 수집 중입니다 . . .';
    else if (processNumber === 2) return '데이터 정제 중입니다 . . .';
    else if (processNumber === 3) return '모델 학습 중입니다 . . .';
    else if (processNumber === 4) return '모델 배포 중입니다 . . .';
    else if (processNumber === 5) {
      return '모델 배포가 완료되었습니다. 10분 뒤에 재시작을 대기합니다.';
    } else {
      return `${timeLeft} 뒤에 재시작합니다.`;
    }
  };

  return (
    <div className={styles.pipelineHeader}>
      {restart ? (
        <PageHeader>{timeLeft} 뒤에 재시작합니다.</PageHeader>
      ) : (
        <PageHeader>{processLabel(currentProcess)}</PageHeader>
      )}
    </div>
  );
}

export default PipelineHeader;
