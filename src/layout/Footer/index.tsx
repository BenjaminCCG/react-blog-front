import React from 'react';
import styles from './style/index.module.scss';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <span>Copyright © 2023 粤ICP备19043740号-1</span>
      <span>博客已运行 0年10个月15天13小时41分41秒</span>
    </div>
  );
}
