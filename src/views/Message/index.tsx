import React from 'react';
import styles from './style/index.module.scss';
import avator from '@/assets/images/avator.jpeg';
import { Divider, Button } from 'antd';
import InputEmoji from 'react-input-emoji';
const messageList = [
  { name: '张三', value: '你好', createTime: '2021-10-15' },
  { name: '李四', value: '你好', createTime: '2021-10-15' },
  { name: '王五', value: '你好', createTime: '2021-10-15' }
];
export default function Message() {
  const [value, setValue] = useState('');
  const handleSubmit = () => {
    console.log(value, '提交');
  };
  return (
    <div className={styles.message}>
      <div className={styles.submit_form}>
        <div className={styles.submit_form_title}>发表留言</div>
        <InputEmoji value={value} onChange={setValue} placeholder="" />
        <Button type="primary" onClick={handleSubmit}>
          发送~
        </Button>
      </div>
      <Divider />
      {messageList.map((item, index) => {
        return (
          <React.Suspense key={index}>
            <div className={styles.reply_item}>
              <img src={avator} alt="" />
              <div className={styles.reply_item_content}>
                <div className={styles.reply_item_content_name}>{item.name}</div>
                <div className={styles.reply_item_content_time}>{item.createTime}</div>
                <div className={styles.reply_item_content_desc}>{item.value}</div>
              </div>
            </div>
            <Divider />
          </React.Suspense>
        );
      })}
    </div>
  );
}
