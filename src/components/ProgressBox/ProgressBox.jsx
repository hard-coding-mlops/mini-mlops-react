import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLearnProgress } from '../../actions/sidebarActions';
import SlotCounter from 'react-slot-counter';

import DOWN_ICON from '../../assets/icons/down-icon.svg';
import UP_ICON from '../../assets/icons/up-icon.svg';

import styles from './ProgressBox.module.css';

function ProgressBox() {
    const dispatch = useDispatch();
    const learnProgress = useSelector((state) => state.sidebar.learnProgress);
    const [showCompletionMessage, setShowCompletionMessage] = useState(false);
    const [closed, setClosed] = useState(true);

    useEffect(() => {
        if (learnProgress === 100) {
            // 모델 학습이 완료되면 3초 후에 완료 메시지를 표시합니다.
            const completionMessageTimeout = setTimeout(() => {
                setShowCompletionMessage(true);
                dispatch(setLearnProgress(-1));
            }, 3000);

            // 컴포넌트가 언마운트되거나 learnProgress가 바뀌면 타이머를 클리어합니다.
            return () => {
                setShowCompletionMessage(false);
                clearTimeout(completionMessageTimeout);
            };
        }
    }, [learnProgress]);

    return (
        <div className={`${styles.progressBox} ${closed ? '' : styles.show}`}>
            <div className={styles.header}>
                <span>IN PROGRESS</span>
                <button onClick={() => setClosed(!closed)} className={styles.closeButton}>
                    <img src={closed ? UP_ICON : DOWN_ICON} className={styles.icon} alt='' />
                </button>
            </div>
            <hr style={{ border: 'none', height: '1px', backgroundColor: '#7a7a7a' }} />
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
