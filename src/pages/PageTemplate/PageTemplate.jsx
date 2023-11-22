import styles from './PageTemplate.module.css';

function PageTemplate({ children }) {
  return <div className={styles.pageTemplate}>{children}</div>;
}

export default PageTemplate;
