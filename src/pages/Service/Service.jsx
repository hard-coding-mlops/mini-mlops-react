import { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import styles from './Service.module.css';
// import LoadingSpinner from './LoadinSpinner';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function Service() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 일정 시간 후에 로딩을 false로 변경
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.service}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <PageHeader>
          <span>SERVICE 페이지로 이동합니다.</span>
        </PageHeader>
      )}
    </div>
  );
}

export default Service;
