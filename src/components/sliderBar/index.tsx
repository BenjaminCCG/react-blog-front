import React from 'react';
import styles from './style/index.module.scss';
import avator from '@/assets/images/avatar.jpg';

export default function SliderBar() {
  const rightData = [
    { label: '全部', value: 1 },
    { label: 'Vue3', value: 2 },
    { label: 'Node', value: 3 },
    { label: 'React', value: 4 },
    { label: 'TypeScript', value: 5 },
    { label: 'JavaScript', value: 6 },
    { label: 'CSS', value: 7 }
  ];

  const bg = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bg.current!.style.height = (document.querySelector('.article_item') as HTMLDivElement).offsetHeight + 'px';
    console.log(bg.current);
  }, []);

  const handleOver = (e: React.MouseEvent) => {
    bg.current!.style.top = (e.target as HTMLDivElement).offsetTop + 'px';
  };
  return (
    <div className={styles.slider_bar}>
      <div className={styles.user_info}>
        <div className={styles.user_info_bgc} />
        <img src={avator} alt="" />
        <div className={styles.user_info_name}>Benjamin</div>
        <div className={styles.user_info_desc}>前端开发工程师</div>
      </div>
      {/* 文章分类 */}
      <div className={styles.article}>
        <div className={styles.article_title}>文章分类</div>
        <div className={`${styles.article_list} relative`}>
          <div
            ref={bg}
            className=" bg-blue-300 absolute w-full opacity-40"
            style={{ transition: 'all 0.1s ease-in-out' }}
          ></div>
          {rightData.map((item) => {
            return (
              <div className={`${styles.article_list_item} article_item`} onMouseOver={handleOver} key={item.value}>
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
