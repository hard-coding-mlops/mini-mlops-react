import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import styles from './Loading.module.css';

function Loading({ message }) {
  return (
    <div className={styles.loading}>
      <LoadingSpinner />
      <br />
      <span>{message}</span>
    </div>
  );
}

export default Loading;
