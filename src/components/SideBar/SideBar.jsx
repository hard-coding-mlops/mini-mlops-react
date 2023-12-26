import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import LOGO from '../../assets/images/HARDCODING_LOGO.svg';
import DASHBOARD_ICON from '../../assets/icons/dashboard-icon.svg';
import DATA_ICON from '../../assets/icons/database-icon.svg';
import MODEL_ICON from '../../assets/icons/robot-icon.svg';
import USER_LOG_ICON from '../../assets/icons/users-icon.svg';
import LOGOUT_ICON from '../../assets/icons/logout-icon.svg';
import COPYRIGHT_ICON from '../../assets/icons/copyright-icon.svg';
import KAKAO_LOGIN_IMG from '../../assets/images/KAKAO_LOGIN_LARGE.png';

import styles from './SideBar.module.css';
import ProgressBox from '../ProgressBox/ProgressBox';

function SideBar() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [isHovered, setHovered] = useState(false);
    const [loggedIn, setLoggedIn] = useState(true);

    const handleLogin = () => {
        // let code = new URL(window.location.href).searchParams.get('code');
        const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
        window.location.href = link;
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('profileImage');
        // 새로고침
        window.location.reload();
    };

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            // navigate('/login');
            setLoggedIn(false);
        }
        const name = localStorage.getItem('user');
        const profileImage = localStorage.getItem('profileImage');
        setUserName(name);
        setProfileImage(profileImage);
    }, []);

    return (
        <>
            <div className={styles.navBar}>
                <div className={styles.logoContainer} onClick={() => navigate('/dashboard')}>
                    <img className={styles.logo} src={LOGO} alt='' />
                    <span className={styles.navBarHeader}>HARD CODING</span>
                </div>
                {loggedIn ? (
                    <div
                        className={styles.profileContainer}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <div className={styles.profile}>
                            <img
                                className={styles.profileImage}
                                src={
                                    profileImage
                                        ? profileImage
                                        : 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'
                                }
                                alt=''
                            />
                            <span>{userName} 님, 어서오세요&nbsp;&nbsp;</span>
                        </div>
                        <div
                            className={`${styles.profileContainerHovered} ${isHovered ? styles.showLogoutButton : ''}`}
                        >
                            <button className={styles.logoutButton} onClick={handleLogout}>
                                <img className={styles.icons} src={LOGOUT_ICON} alt='' />
                                <span style={{ marginLeft: '0.5rem' }}>LOGOUT</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <img onClick={handleLogin} src={KAKAO_LOGIN_IMG} className={styles.kakaoButton} alt='kakao-login' />
                )}
            </div>
            <div className={styles.sideBar}>
                <div className={styles.sideBarMenu}>
                    <button onClick={() => navigate('/dashboard')} className={styles.navButton}>
                        <img className={styles.icons} src={DASHBOARD_ICON} alt='' />
                        <span className={styles.buttonText}>DASHBOARD</span>
                    </button>
                    <button onClick={() => navigate('/data')} className={styles.navButton}>
                        <img className={styles.icons} src={DATA_ICON} alt='' />
                        <span className={styles.buttonText}>DATA</span>
                    </button>
                    <button onClick={() => navigate('/model')} className={styles.navButton}>
                        <img className={styles.icons} src={MODEL_ICON} alt='' />
                        <span className={styles.buttonText}>MODELS</span>
                    </button>
                    <button onClick={() => navigate('/user-log')} className={styles.navButton}>
                        <img className={styles.icons} src={USER_LOG_ICON} alt='' />
                        <span className={styles.buttonText}>USER&nbsp;LOGS</span>
                    </button>
                </div>
                <footer className={styles.footer}>
                    <div>
                        <img src={COPYRIGHT_ICON} alt='' />
                        <span className={styles.org}>HARD&nbsp;CODING</span>
                    </div>
                    <span className={styles.ymd}>2023</span>
                </footer>
            </div>
            {/* {loggedIn && <div className={styles.loginAlert}>PLEASE LOGIN FIRST</div>} */}
            <ProgressBox />
            <Outlet />
        </>
    );
}

export default SideBar;
