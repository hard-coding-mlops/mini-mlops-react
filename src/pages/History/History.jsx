import { useParams } from 'react-router-dom';
import HistoryBar from '../../components/HistoryBar/HistoryBar';
import PageHeader from '../../components/PageHeader/PageHeader';
import styles from './History.module.css';
// import topLeftBorder from '../assets/images/top-left-border.svg';
// import bottomRightBorder from '../assets/images/bottom-right-border.svg';

function History() {
  const { recordId } = useParams();

  return (
    <>
      <HistoryBar />
      <div className={styles.history}>
        <div className={styles.historyPageHeader}>
          <PageHeader>
            <span>2023년 11월 10일 09시 30분 모델 성능 평가</span>
          </PageHeader>
        </div>
        <div className={styles.historyPageBody}>대충 id:{recordId} 관련 표 여러 개</div>
      </div>
    </>
  );
}

export default History;
