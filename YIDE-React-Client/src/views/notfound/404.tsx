import { useEffect, useState } from 'react';
import styles from './index.module.less';

function TypingEffect({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(prev => prev + text[index++]);
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [text]);

  return <p>{displayedText}</p>;
}

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={`${styles.copyContainer} ${styles.centerXy}`}>
        <TypingEffect text='Welcome to YIDE. However, get 404, page not found...' />
        <span className={styles.handle}></span>
      </div>
    </div>
  );
}
