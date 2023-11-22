import styles from './PageTemplate.module.css';

function BodyTemplate({ children }) {
  return <div className={styles.bodyTemplate}>{children}</div>;
}

export default BodyTemplate;
