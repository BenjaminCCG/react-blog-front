import React from 'react';
import styles from './style/index.module.scss';
import avator from '@/assets/images/avator.jpeg';
import { Divider, Button, message, Skeleton } from 'antd';
import InputEmoji from 'react-input-emoji';
import { queryMessagePage, saveMessage } from '@/network/api/api';
import { useSetState } from 'react-use';
import { Message as M } from '@/network/api/api-params-moudle';

export default function Message() {
  const [value, setValue] = useState('');
  const [total, setTotal] = useState(0);

  const [pageInfo, setPageInfo] = useSetState({
    pageNum: 1,
    pageSize: 10
  });
  const [messageList, setMessageList] = useState<M[]>([]);
  const fetchMessage = async () => {
    const res = await queryMessagePage(pageInfo);
    if (pageInfo.pageNum === 1) {
      setMessageList(res.records!);
    } else {
      setMessageList([...messageList, ...res.records!]);
    }

    setTotal(res.total!);
  };
  useEffect(() => {
    fetchMessage();
  }, [pageInfo.pageNum]);
  const handleSubmit = () => {
    if (!value) {
      message.warning('请输入留言内容');
      return;
    } else if (value.length > 200) {
      message.warning('您说的太多啦，请小于200个字哦');
      return;
    }
    saveMessage({ comment: value }).then(() => {
      message.success('感谢您的留言支持');
      setValue('');
      if (pageInfo.pageNum > 1) {
        setPageInfo({
          pageNum: 1
        });
      } else {
        fetchMessage();
      }
    });
  };
  const loadMore = () => {
    if (pageInfo.pageNum * pageInfo.pageSize < total) {
      setPageInfo({
        pageNum: pageInfo.pageNum + 1
      });
    }
  };
  return (
    <div className={styles.message}>
      <div className={styles.submit_form}>
        <div className={styles.submit_form_title}>
          <span className="font-bold">发表留言</span>
          <span>已有{total}条</span>
        </div>
        <InputEmoji value={value} onChange={setValue} placeholder="" />
        <Button type="primary" onClick={handleSubmit}>
          发送~
        </Button>
      </div>
      <Divider />
      {messageList.length > 0 ? (
        messageList.map((item, index) => {
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
        })
      ) : (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      )}
      {pageInfo.pageNum * pageInfo.pageSize < total && (
        <Button type="primary" block onClick={loadMore}>
          加载更多数据~
        </Button>
      )}
    </div>
  );
}
