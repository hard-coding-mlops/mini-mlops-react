import styles from './PageTemplate.module.css';

function HeaderTemplate({ children }) {
  return <div className={styles.headerTemplate}>{children}</div>;
}

export default HeaderTemplate;
