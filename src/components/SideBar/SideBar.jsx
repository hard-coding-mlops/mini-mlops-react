import { useNavigate, useLocation, useMatch, Outlet } from 'react-router-dom';

import styles from './SideBar.module.css';

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className={styles.sideBar}>
        <button
          className={`${styles.navigationButton} ${useMatch('/history/*') ? styles.activeButton : ''}`}
          onClick={() => {
            navigate('/history/1');
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
            setTimeout(() => {
              window.open(`/news-classifier`, '_blank');
            }, 3000);
          }}
        >
          SERVICE
        </button>
      </div>
      <Outlet />
    </>
  );
}

export default SideBar;
