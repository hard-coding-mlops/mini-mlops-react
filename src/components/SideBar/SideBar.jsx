import { Outlet, useNavigate } from 'react-router-dom';
import styles from './SideBar.module.css';
import { useEffect, useState } from 'react';
import LOGO from '../../assets/images/HARDCODING_LOGO.svg';

function SideBar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isHovered, setHovered] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('profileImage');
    navigate('/login');
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    const name = localStorage.getItem('user');
    const profileImage = localStorage.getItem('profileImage');
    setUserName(name);
    setProfileImage(profileImage);
  }, []);

  return (
    <>
      <div className={styles.navBar}>
        <div className={styles.logoContainer}>
          <img className={styles.logo} src={LOGO} alt='' />
          <span className={styles.navBarHeader}>HARD CODING</span>
        </div>
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
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQLHZh0aF5Og2DF4G19yPVx_QGjXfaBByFZA&usqp=CAU'
              }
              alt=''
            />
            <span>{userName} 님, 어서오세요&nbsp;&nbsp;</span>
          </div>
          <div className={`${styles.profileContainerHovered} ${isHovered ? styles.showLogoutButton : ''}`}>
            <button className={styles.logoutButton} onClick={handleLogout}>
              LOGOUT
            </button>
          </div>
        </div>
      </div>
      <div className={styles.sideBar}>
        <div className={styles.sideBarMenu}>
          <button onClick={() => navigate('/dashboard')} className={styles.navButton}>
            <div className={styles.testIcon}>ICON</div>
            <span className={styles.buttonText}>DASHBOARD</span>
          </button>
          <button onClick={() => navigate('/data')} className={styles.navButton}>
            <div className={styles.testIcon}>ICON</div>
            <span className={styles.buttonText}>DATA</span>
          </button>
          <button onClick={() => navigate('/model')} className={styles.navButton}>
            <div className={styles.testIcon}>ICON</div>
            <span className={styles.buttonText}>MODELS</span>
          </button>
          <button onClick={() => navigate('/user-log')} className={styles.navButton}>
            <div className={styles.testIcon}>ICON</div>
            <span className={styles.buttonText}>USER&nbsp;LOGS</span>
          </button>
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default SideBar;
