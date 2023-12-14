import styles from './LoadingBar.module.css';
import { useEffect } from 'react';

function LoadingBar({ percentage }) {
    useEffect(() => {
        const loadingBar = document.querySelector(`.${styles.loadingBar}`);
        loadingBar.style.width = `${percentage}%`;
    }, [percentage]);

    return (
        <div className={styles.loadingBarContainer}>
            <div className={styles.loadingBar}></div>
        </div>
    );
}

export default LoadingBar;
