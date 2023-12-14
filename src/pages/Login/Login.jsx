import { useNavigate } from 'react-router-dom';

import KAKAO_LOGIN from '../../assets/images/KAKAO_LOGIN_LARGE.png';
import LOGO from '../../assets/images/HARDCODING_LOGO.svg';

import styles from './Login.module.css';

function Login() {
    const navigate = useNavigate();
    let code = new URL(window.location.href).searchParams.get('code');
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

    const handleLogin = () => {
        window.location.href = link;
    };

    return (
        <div className={styles.loginContainer}>
            <button className={styles.loginButton} onClick={handleLogin}>
                <img src={KAKAO_LOGIN} alt='' />
            </button>
        </div>
    );
}

export default Login;
