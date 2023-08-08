import React from 'react';
import styles from './style/index.module.scss';
import avator from '@/assets/images/avatar.jpg';

export default function SliderBar() {
  const rightData = [
    { label: '全部', value: 1 },
    { label: 'Vue3', value: 2 },
    { label: 'Node', value: 3 }
  ];
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
        <div className={styles.article_list}>
          {rightData.map((item) => {
            return (
              <div className={styles.article_list_item} key={item.value}>
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
