import React from 'react';
import { To } from 'react-router-dom';
import styles from './style/index.module.scss';
import Typed from 'typed.js';
import logo from '@assets/images/logo.png';
export default function HeadNav() {
  const menuList = [
    { title: '首页', path: '/' },
    { title: '生活分享', path: '/life' },
    { title: '留言板', path: '/message' },
    { title: '关于我', path: '/about' }
  ];

  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Hello,I am Benjamin', 'Welcome !'],
      typeSpeed: 50
    });
    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  const router = useNavigate();

  const menuClick = (path: To) => {
    router(path);
  };

  const location = useLocation();

  return (
    <div className={styles.headerWrap}>
      {/* 导航区域 */}
      <div className={styles.headNav}>
        {/* <div className={styles.logo}>搜索|LOGO区域</div> */}
        <img src={logo} alt="" className={`${styles.logo}`} />
        <div className={styles.navBar}>
          {menuList.map((item) => {
            return (
              <div
                key={item.path}
                className={`${styles.menuItem} ${location.pathname === item.path ? styles.active : ''}`}
                onClick={() => menuClick(item.path)}
              >
                {item.title}
              </div>
            );
          })}
        </div>
      </div>
      {/* 打字机区域 */}
      <div ref={el} className={styles.typeIntro} />
    </div>
  );
}
