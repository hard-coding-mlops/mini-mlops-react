import { useNavigate } from 'react-router-dom';

import KAKAO_LOGIN from '../../assets/images/KAKAO_LOGIN_LARGE.png';
import LOGO from '../../assets/images/HARDCODING_LOGO.svg';

import styles from './Login.module.css';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
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
