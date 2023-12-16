import { Outlet, useNavigate } from 'react-router-dom';
import styles from './SideBar.module.css';
import { useEffect, useState } from 'react';

function SideBar() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    const handleLogout = () => {
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
                <div style={{ width: '150px' }}>
                    <div className={styles.navHeader}>
                        <span className={styles.userName}>{userName}</span>
                        <span className={styles.userText}>&nbsp;님의&nbsp;MLOps</span>
                    </div>
                    <button className={styles.navButton}>
                        <div className={styles.testIcon}>ICON</div>
                        <span className={styles.buttonText}>DASHBOARD</span>
                    </button>
                    <button className={styles.navButton}>
                        <div className={styles.testIcon}>ICON</div>
                        <span className={styles.buttonText}>DATA</span>
                    </button>
                    <button className={styles.navButton}>
                        <div className={styles.testIcon}>ICON</div>
                        <span className={styles.buttonText}>MODELS</span>
                    </button>
                    <button className={styles.navButton}>
                        <div className={styles.testIcon}>ICON</div>
                        <span className={styles.buttonText}>USER&nbsp;LOGS</span>
                    </button>
                </div>
                <div style={{ width: '150px' }}>
                    <button className={styles.navButton} onClick={handleLogout}>
                        <div className={styles.testIcon}>ICON</div>
                        <span className={styles.buttonText}>LOGOUT</span>
                    </button>
                </div>
            </div>

            <Outlet />
        </>
    );
}

export default SideBar;
