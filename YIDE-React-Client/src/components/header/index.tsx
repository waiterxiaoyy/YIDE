import styles from './index.module.less';
import { VscGithubInverted, VscAccount } from 'react-icons/vsc';
import { SiReadthedocs } from 'react-icons/si';
import { useState } from 'react';
import { userStore } from '@/store/userStore';
import storage from '@/utils/storage';
export default function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const userName = userStore(state => state.username);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    storage.remove('token');
    setDropdownVisible(false);
    window.location.href = '/login';
  };

  const handleLogin = () => {
    setDropdownVisible(false);
    window.location.href = '/login';
  };

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const handleHref = (type: string) => {
    let url = '';

    if (type === 'github') {
      url = 'https://github.com/waiterxiaoyy/YIDE';
    } else if (type === 'document') {
      url = 'https://github.com/waiterxiaoyy/YIDE/blob/main/README.md';
    }

    if (url) {
      window.open(url, '_blank');
    }
  };
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <img src='YIDE.png' alt='YIDE' />
        </div>
        <div className={styles.sologan}>Programming Freedom, Infinite Possibilities</div>
      </div>
      <div className={styles.right}>
        <div className={styles.menus}>
          <div className={styles.menuItem} onClick={() => handleHref('github')}>
            <VscGithubInverted className={styles.menuItemIcon} />
            <div>Github</div>
          </div>
          <div className={styles.menuItem} onClick={() => handleHref('document')}>
            <SiReadthedocs className={styles.menuItemIcon} />
            <div>Document</div>
          </div>
        </div>
        <div className={styles.user}>
          <VscAccount onClick={toggleDropdown} title='User' />
        </div>
        <div
          className={`${styles.dropdown} ${dropdownVisible ? styles.show : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.dropdownItem}>{userName}</div>
          {userName ? (
            <div className={styles.dropdownItem} onClick={handleLogout}>
              Logout
            </div>
          ) : (
            <div className={styles.dropdownItem} onClick={handleLogin}>
              Login
            </div>
          )}
          {/* <div className={styles.dropdownItem} onClick={handleLogin}>
            Login
          </div> */}
        </div>
      </div>
    </div>
  );
}
