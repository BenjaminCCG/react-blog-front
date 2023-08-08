import React from 'react';
import styles from './style/index.module.scss';
import { Input, Divider } from 'antd';
const { TextArea } = Input;
const messageList = [
  { name: '张三', value: '你好', createTime: '2021-10-15' },
  { name: '李四', value: '你好', createTime: '2021-10-15' },
  { name: '王五', value: '你好', createTime: '2021-10-15' }
];
export default function Message() {
  return (
    <div className={styles.message}>
      <div className={styles.submit_form}>
        <Input size="large" placeholder="大侠，留下您的大名" />
        <TextArea rows={4} placeholder="请留下您的宝贵意见" />
      </div>

      <Divider />
      {messageList.map((item, index) => {
        return (
          <div className={styles.reply_item} key={index}>
            <div className={styles.reply_item_header}>{item.name}</div>
            <Divider />
            <div className={styles.reply_item_content}>
              <div>{item.value}</div>
              <div>{item.createTime}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
