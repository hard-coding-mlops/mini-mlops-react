import { useState } from 'react';

import DOWN_ICON from '../../assets/icons/down-icon.svg';
import UP_ICON from '../../assets/icons/up-icon.svg';

import styles from './ProgressBox.module.css';

function ProgressBox() {
    const [closed, setClosed] = useState(true);

    return (
        <div className={`${styles.progressBox} ${closed ? '' : styles.show}`}>
            <div className={styles.header}>
                <span>IN PROGRESS</span>
                <button onClick={() => setClosed(!closed)} className={styles.closeButton}>
                    <img src={closed ? UP_ICON : DOWN_ICON} className={styles.icon} alt='' />
                </button>
            </div>
            <hr style={{ border: 'none', height: '1px', backgroundColor: '#7a7a7a' }} />
        </div>
    );
}

export default ProgressBox;
