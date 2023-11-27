import { Outlet } from 'react-router-dom';

import styles from './SideBar.module.css';
import NavButton from '../NavButton/NavButton';

function SideBar() {
  return (
    <>
      <div className={styles.sideBar}>
        <NavButton to='/dashboard' label='DASHBOARD' />
        <NavButton to='/data' label='데이터 관리' />
        <NavButton to='/models' label='모델 관리' />
        <NavButton to='/user-logs' label='사용자 로그' />
      </div>

      <Outlet />
    </>
  );
}

export default SideBar;
