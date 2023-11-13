import topLeftBorder from '../../assets/images/top-left-border.svg';
import bottomRightBorder from '../../assets/images/bottom-right-border.svg';
import styles from './PageHeader.module.css';

function HistoryPageHeader({ children }) {
  return (
    <div className={styles.pageHeader}>
      <img src={topLeftBorder} className={styles.topLeftBorder} alt='' />
      <div className={styles.recordTitle}>{children}</div>
      <img src={bottomRightBorder} className={styles.bottomRightBorder} alt='' />
    </div>
  );
}

export default HistoryPageHeader;
