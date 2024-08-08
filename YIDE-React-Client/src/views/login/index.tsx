import { useState } from 'react';
import styles from './index.module.less';
import api from '@/api';
import storage from '@/utils/storage';

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const data = await api.login({ username: userName, password });
    if (data) {
      storage.set('token', data);
      window.location.href = '/';
    }
  };

  const handleChange = ({
    event,
    type
  }: {
    event: React.ChangeEvent<HTMLInputElement>;
    type: 'username' | 'password';
  }) => {
    if (type === 'username') {
      setUserName(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };
  return (
    <div className={styles.login}>
      <div className={styles.loginInfo}>
        <div className={styles.title}>YIDE</div>
        <div className={styles.slogan}>Programming Freedom, Infinite Possibilities</div>
        <div className={styles.info}>
          YIDE is an online compiler that jouempowers your codingrney with unmatched freedom and limitless potential.
        </div>
        <div className={styles.autor}>By WaiterXiaoYY</div>
        <div className={styles.infoImg}></div>
      </div>
      <div className={styles.loginBox}>
        <div className={styles.loginForm}>
          <div className={styles.loginTitle}>Login Here</div>
          <input
            className={styles.loginInput}
            placeholder='Username'
            type='text'
            value={userName}
            onChange={event => handleChange({ event, type: 'username' })}
          />
          <input
            className={styles.loginInput}
            placeholder='Password'
            type='password'
            value={password}
            onChange={event => handleChange({ event, type: 'password' })}
          />
          <button className={styles.loginButton} onClick={handleLogin}>
            Login
          </button>

          <p className={styles.link}>If you don't have an account, login will create one for you.</p>
        </div>
      </div>
    </div>
  );
}
