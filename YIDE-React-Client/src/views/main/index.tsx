import { useState, useRef, useEffect } from 'react';
import styles from './index.module.less';

import 'react-toastify/dist/ReactToastify.css';
import IView from '@/components/view';
import IEditor from '@/components/editor';
import Explorer from '@/components/explorer';
import Header from '@/components/header';
import api from '@/api';
import { userStore } from '@/store/userStore';

function Main() {
  const setUserStoreName = userStore(state => state.setUserName);
  const [leftWidth, setLeftWidth] = useState(300); // 初始宽度
  const [middleWidth, setMiddleWidth] = useState(950); // 初始宽度

  const minLeftWidth = 300;
  const maxLeftWidth = 500;
  const minMiddleWidth = 900;
  const minRightWidth = 500;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const viewOuputRef = useRef<HTMLDivElement | null>(null);

  const isResizingLeft = useRef(false);
  const isResizingMiddle = useRef(false);

  const getUserInfo = async () => {
    const data = await api.getUserInfo();
    if (data) {
      // console.log('data', data);
      setUserStoreName(data.username);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleMouseDownLeft = () => {
    isResizingLeft.current = true;
  };

  const handleMouseDownMiddle = () => {
    isResizingMiddle.current = true;
    if (viewOuputRef.current) {
      viewOuputRef.current.style.visibility = 'hidden';
      const viewDefaultElement = document.getElementById('view-default');
      if (viewDefaultElement) {
        viewDefaultElement.style.display = 'block';
      }
    }
  };

  const handleMouseUp = () => {
    isResizingLeft.current = false;
    isResizingMiddle.current = false;
    if (viewOuputRef.current) {
      viewOuputRef.current.style.visibility = 'visible';
      const viewDefaultElement = document.getElementById('view-default');
      if (viewDefaultElement) {
        viewDefaultElement.style.display = 'none';
      }
    }
  };

  const handleMouseMove = (e: { clientX: number }) => {
    const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 0;

    if (isResizingLeft.current) {
      const newLeftWidth = containerRef.current ? e.clientX : 0;
      const rightWidth = rightRef.current ? rightRef.current.offsetWidth : minRightWidth;
      const newMiddleWidth = containerRef.current ? containerWidth - e.clientX - 4 - rightWidth : minMiddleWidth;
      if (newLeftWidth > minLeftWidth && newLeftWidth < maxLeftWidth) {
        setLeftWidth(newLeftWidth);
        const maxMiddleWidth = containerWidth - 4 - leftWidth - minRightWidth; // 200px 是右侧栏的最小宽度
        setMiddleWidth(Math.min(Math.max(newMiddleWidth, minMiddleWidth), maxMiddleWidth));
      }
    }

    if (isResizingMiddle.current) {
      // 计算中间栏的新宽度
      const newMiddleWidth = containerRef.current
        ? e.clientX - containerRef.current.getBoundingClientRect().left - leftWidth
        : 0;

      // 计算右侧栏的最小宽度

      const maxMiddleWidth = containerWidth - 4 - leftWidth - minRightWidth; // 200px 是右侧栏的最小宽度

      setMiddleWidth(Math.min(Math.max(newMiddleWidth, minMiddleWidth), maxMiddleWidth));
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [leftWidth, middleWidth]);

  const [reloadKey, setReloadKey] = useState(0);

  const handleReload = () => {
    setReloadKey(prevKey => prevKey + 1);
  };

  return (
    <div className={styles.mainPage}>
      <Header />
      <div className={styles.content} ref={containerRef}>
        <div className={styles.explorer} style={{ width: `${leftWidth}px` }}>
          <Explorer />
        </div>
        <div className={styles.resizer} onMouseDown={handleMouseDownLeft} onMouseUp={handleMouseUp}></div>
        <div className={styles.editor} style={{ width: `${middleWidth}px` }}>
          <IEditor callBackReload={handleReload} />
        </div>
        <div className={styles.resizer} onMouseDown={handleMouseDownMiddle} onMouseUp={handleMouseUp}></div>
        <div className={styles.view} ref={rightRef} style={{ backgroundColor: '1e1e1e' }}>
          <div className={styles.viewDefault} id='view-default'>
            View-Window-Output
          </div>
          <div className={styles.viewOutput} ref={viewOuputRef}>
            <IView reloadKey={reloadKey} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
