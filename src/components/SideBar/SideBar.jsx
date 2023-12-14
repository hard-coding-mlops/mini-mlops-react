import { Outlet } from 'react-router-dom';

import styles from './SideBar.module.css';
import NavButton from '../NavButton/NavButton';
// import LoadingBar from '../LoadingBar/LoadingBar';

function SideBar() {
    return (
        <>
            <div className={styles.sideBar}>
                {/* <LoadingBar percentage={20} /> */}
                <NavButton to='/dashboard' label='DASHBOARD' />
                <NavButton to='/data' label='데이터 관리' />
                <NavButton to='/model' label='모델 관리' />
                <NavButton to='/user-log' label='사용자 로그' />
            </div>

            <Outlet />
        </>
    );
}

export default SideBar;
