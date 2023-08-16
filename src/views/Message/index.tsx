import React from 'react';
import styles from './style/index.module.scss';
import avator from '@/assets/images/avator.jpeg';
import { Divider, Button, message } from 'antd';
import InputEmoji from 'react-input-emoji';
import { queryMessagePage, saveMessage } from '@/network/api/api';
import { useMount } from 'react-use';
import { Message as M } from '@/network/api/api-params-moudle';

export default function Message() {
  const [value, setValue] = useState('');

  const pageInfo = {
    pageNum: 1,
    pageSize: 10
  };
  const [messageList, setMessageList] = useState<M[]>([]);
  const fetchMessage = async () => {
    const res = await queryMessagePage(pageInfo);
    setMessageList(res.records!);
  };
  useMount(() => {
    fetchMessage();
  });

  const handleSubmit = () => {
    saveMessage({ comment: value }).then(() => {
      message.success('感谢您的留言支持');
      setValue('');
      fetchMessage();
    });
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
                <div className={styles.reply_item_content_time}>
                  <span>{item.createTime}</span>
                  <span className="ml-1">Ip属地：{item.ip}</span>
                </div>
                <div className={styles.reply_item_content_desc}>{item.comment}</div>
              </div>
            </div>
            <Divider />
          </React.Suspense>
        );
      })}
    </div>
  );
}
