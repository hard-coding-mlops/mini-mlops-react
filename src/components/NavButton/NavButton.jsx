import { useLocation, useNavigate } from 'react-router-dom';

import styles from './NavButton.module.css';

function NavButton({ to, label }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);

  return (
    <button
      className={`${styles.navButton} ${isActive ? styles.activeButton : ''}`}
      onClick={() => {
        navigate(to);
      }}
    >
      {label}
    </button>
  );
}

export default NavButton;
