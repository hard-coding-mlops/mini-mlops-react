import { useMatch, useNavigate } from 'react-router-dom';

import styles from './NavButton.module.css';

function NavButton({ to, label }) {
  const navigate = useNavigate();

  return (
    <button
      className={`${styles.navButton} ${useMatch(to) ? styles.activeButton : ''}`}
      onClick={() => {
        navigate(to);
      }}
    >
      {label}
    </button>
  );
}

export default NavButton;
