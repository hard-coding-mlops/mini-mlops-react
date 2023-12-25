import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLearnProgress, setScrapeProgress } from '../../actions/sidebarActions';
import SlotCounter from 'react-slot-counter';

import DOWN_ICON from '../../assets/icons/down-icon.svg';
import UP_ICON from '../../assets/icons/up-icon.svg';

import styles from './ProgressBox.module.css';

function ProgressBox() {
    const dispatch = useDispatch();
    const learnProgress = useSelector((state) => state.sidebar.learnProgress);
    const scrapeProgress = useSelector((state) => state.sidebar.scrapeProgress);

    const [closed, setClosed] = useState(true);
    const [scrapeState, setScrapeState] = useState('데이터 수집 중');

    useEffect(() => {
        if (scrapeProgress < 51) {
            setScrapeState('데이터 수집 중...');
        } else if (scrapeProgress < 100) {
            setScrapeState('데이터 정제 중...');
        } else if (scrapeProgress === 100) {
            setScrapeState('데이터 수집 완료');
            // 3초 후에 scrapeProgress를 0으로 초기화
            setTimeout(() => {
                dispatch(setScrapeProgress(0));
            }, 5000);
        }
    }, [scrapeProgress]);

    return (
        <div className={`${styles.progressBox} ${closed ? '' : styles.show}`}>
            <div className={styles.header}>
                <span>IN PROGRESS</span>
                <button onClick={() => setClosed(!closed)} className={styles.closeButton}>
                    <img src={closed ? UP_ICON : DOWN_ICON} className={styles.icon} alt='' />
                </button>
            </div>
            <hr style={{ border: 'none', height: '1px', backgroundColor: '#7a7a7a' }} />
            {scrapeProgress === 0 ? (
                <div className={styles.empty}>텅 . . .</div>
            ) : (
                <div>
                    <span style={{ fontSize: '18px' }}>
                        - {scrapeState} &nbsp;
                        <SlotCounter value={scrapeProgress.toFixed(0)} duration={1} dummyCharacterCount={7} />%
                    </span>
                    <div className={styles.loadingBar}>
                        <div
                            className={styles.currentProgress}
                            style={{ width: `${scrapeProgress.toFixed(1)}%` }}
                        ></div>
                    </div>
                </div>
            )}
            <br />
            {learnProgress === -1 ? (
                <div className={styles.empty}>텅 . . .</div>
            ) : (
                <div>
                    <span style={{ fontSize: '18px' }}>
                        - 모델 학습 중... &nbsp;
                        <SlotCounter value={learnProgress} duration={1} dummyCharacterCount={7} />%
                    </span>
                    <div className={styles.loadingBar}>
                        <div className={styles.currentProgress} style={{ width: `${learnProgress}%` }}></div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProgressBox;
