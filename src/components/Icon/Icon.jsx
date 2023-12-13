import ADD_ICON from '../../assets/icons/add-icon.svg';
import BACK_ICON from '../../assets/icons/back-icon.svg';
import DOWNLOAD_ICON from '../../assets/icons/download-icon.svg';
import EDIT_ICON from '../../assets/icons/edit-icon.svg';
import ROCKET_ICON from '../../assets/icons/rocket-icon.svg';
import SAVE_ICON from '../../assets/icons/save-icon.svg';
import TRASH_ICON from '../../assets/icons/trash-icon.svg';
import USERLOG_ICON from '../../assets/icons/userlog-icon.svg';
import SERVICE_ICON from '../../assets/icons/service-icon.svg';
import TEST_ICON from '../../assets/icons/test-icon.svg';

import styles from './Icon.module.css';

const ICON_LABEL = {
    add: ADD_ICON,
    back: BACK_ICON,
    csv: DOWNLOAD_ICON,
    delete: TRASH_ICON,
    edit: EDIT_ICON,
    deploy: ROCKET_ICON,
    save: SAVE_ICON,
    userlog: USERLOG_ICON,
    service: SERVICE_ICON,
    test: TEST_ICON,
};
const LABEL_COLOR = {
    add: '#3498DB',
    back: '#FF6B6B',
    csv: '#4CAF50',
    delete: '#FF6B6B',
    edit: '#FFA500',
    deploy: '#FF6B6B',
    save: '#FFA500',
    test: '#FFA500',
    userlog: '#3498DB',
    service: '#3498DB',
};

function Icon({ label, handleOnClick }) {
    return (
        <button className={styles.iconWithLabel} onClick={handleOnClick}>
            <img src={ICON_LABEL[label]} alt={label} className={styles.icon} />
            <span className={styles.label} style={{ color: LABEL_COLOR[label] }}>
                {label.toUpperCase()}
            </span>
        </button>
    );
}

export default Icon;
