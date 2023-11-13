import { useNavigate, useLocation, useMatch } from 'react-router-dom';

import styles from './SideBar.module.css';

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.sideBar}>
      <button
        className={`${styles.navigationButton} ${useMatch('/history/*') ? styles.activeButton : ''}`}
        onClick={() => {
          navigate('/history');
        }}
      >
        HISTORY
      </button>
      <button
        className={`${styles.navigationButton} ${location.pathname === '/' ? styles.activeButton : ''}`}
        onClick={() => {
          navigate('/');
        }}
      >
        PIPELINE
      </button>
      <button
        className={`${styles.navigationButton} ${location.pathname === '/service' ? styles.activeButton : ''}`}
        onClick={() => {
          navigate('/service');
        }}
      >
        SERVICE
      </button>
    </div>
  );
}

export default SideBar;
