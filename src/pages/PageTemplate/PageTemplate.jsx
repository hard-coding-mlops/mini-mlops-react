import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import styles from './PageTemplate.module.css';

function PageTemplate({ children }) {
    const [loggedIn, setLoggedIn] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            setLoggedIn(false);
            toast('LOGIN FIRST', {
                icon: '🔑',
            });
        }
    }, []);

    return <div className={styles.pageTemplate}>{children}</div>;
}

export default PageTemplate;
