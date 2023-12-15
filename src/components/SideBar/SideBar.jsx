import { Outlet, useNavigate } from 'react-router-dom';

import styles from './SideBar.module.css';
import NavButton from '../NavButton/NavButton';
import { useEffect, useState } from 'react';
// import LoadingBar from '../LoadingBar/LoadingBar';

function SideBar() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    const handleLogout = () => {
        // 카카오 로그아웃 API 호출
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
        const name = localStorage.getItem('user');
        setUserName(name);
    }, []);

    return (
        <>
            <div className={styles.sideBar}>
                <div className={styles.mainMenu}>
                    {/* <LoadingBar percentage={20} /> */}
                    <div className={styles.userProfileContainer}>
                        <span className={styles.userProfile}>{userName}</span>님, 어서오세요
                    </div>
                    <NavButton to='/dashboard' label='DASHBOARD' />
                    <NavButton to='/data' label='데이터 관리' />
                    <NavButton to='/model' label='모델 관리' />
                    <NavButton to='/user-log' label='사용자 로그' />
                </div>
                <button className={styles.navButton} onClick={handleLogout}>
                    로그아웃
                </button>
            </div>

            <Outlet />
        </>
    );
}

export default SideBar;
