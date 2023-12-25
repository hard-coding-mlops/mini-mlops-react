import styles from './PageTemplate.module.css';
import HOME_ICON from '../../assets/icons/home-icon.svg';
import { useNavigate } from 'react-router-dom';

function HeaderTemplate({ title, routes }) {
    const navigate = useNavigate();

    return (
        <div className={styles.headerTemplate}>
            <span style={{ fontSize: '1.7rem', letterSpacing: '4px' }}>{title}</span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img style={{ width: '22px' }} src={HOME_ICON} alt='' />
                <span style={{ fontSize: '1.3rem', color: '#7A7A7A' }}>&nbsp;&nbsp;/&nbsp;{routes}</span>
            </div>
        </div>
    );
}

export default HeaderTemplate;
