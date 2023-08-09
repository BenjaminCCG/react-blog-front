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

  const hoverRef = useRef<HTMLDivElement | null>(null);

  const handleEnter = (e: React.MouseEvent) => {
    hoverRef.current!.style.top = (e.target as HTMLDivElement).offsetTop + 'px';
  };
  const [searchParams, setSearchParams] = useSearchParams();

  const setPosition = () => {
    const current = Number(searchParams.get('type')) || 0;
    hoverRef.current!.style.top =
      (document.querySelectorAll('.article_item')[current] as HTMLDivElement).offsetTop + 'px';
  };

  const handleClick = (idx: number) => {
    setSearchParams({
      ...searchParams,
      type: String(idx)
    });
  };

  useEffect(() => {
    setPosition();
  }, []);
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
        <div className={`${styles.article_list} relative`} onMouseLeave={setPosition}>
          <div ref={hoverRef} className={`${styles.hoverRef} absolute top-0 left-0 w-full cursor-pointer `}></div>
          {rightData.map((item, idx) => {
            return (
              <div
                className={`${styles.article_list_item} ${
                  Number(searchParams.get('type')) === idx ? '!text-black' : ''
                } article_item relative z-10`}
                onClick={() => handleClick(idx)}
                onMouseEnter={handleEnter}
                key={item.value}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
