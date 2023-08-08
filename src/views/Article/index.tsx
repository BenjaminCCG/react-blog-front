import SliderBar from '@/components/sliderBar';
import styles from './style/index.module.scss';
function Article() {
  const leftData = [
    {
      img: 'https://oss.cui10.com/uploads/images/img-1682489030435.jpg',
      title: 'ECharts 数据更新后原数据是否仍然保留的配置',
      desc: '重新调用 setOption 后，新的数据出现了，但是原来的数据仍然保留在图表中。',
      time: '2021-10-15',
      type: '前端',
      author: 'cui10'
    },
    {
      img: 'https://oss.cui10.com/uploads/images/img-1682489030435.jpg',
      title: 'ECharts 数据更新后原数据是否仍然保留的配置',
      desc: '重新调用 setOption 后，新的数据出现了，但是原来的数据仍然保留在图表中。',
      time: '2021-10-15',
      type: '前端',
      author: 'cui10'
    },
    {
      img: 'https://oss.cui10.com/uploads/images/img-1682489030435.jpg',
      title: 'ECharts 数据更新后原数据是否仍然保留的配置',
      desc: '重新调用 setOption 后，新的数据出现了，但是原来的数据仍然保留在图表中。',
      time: '2021-10-15',
      type: '前端',
      author: 'cui10'
    },
    {
      img: 'https://oss.cui10.com/uploads/images/img-1682489030435.jpg',
      title: 'ECharts 数据更新后原数据是否仍然保留的配置',
      desc: '重新调用 setOption 后，新的数据出现了，但是原来的数据仍然保留在图表中。',
      time: '2021-10-15',
      type: '前端',
      author: 'cui10'
    },
    {
      img: 'https://oss.cui10.com/uploads/images/img-1682489030435.jpg',
      title: 'ECharts 数据更新后原数据是否仍然保留的配置',
      desc: '重新调用 setOption 后，新的数据出现了，但是原来的数据仍然保留在图表中。',
      time: '2021-10-15',
      type: '前端',
      author: 'cui10'
    }
  ];

  return (
    <div className={styles.article_wrap}>
      <div className={styles.article_content}>
        {leftData.map((item, index) => {
          return (
            <div className={styles.article_content_item} key={index}>
              <img src={item.img} alt="" />
              <div className={styles.article_content_item_info}>
                <div className={styles.article_content_item_info_title}>{item.title}</div>
                <div className={styles.article_content_item_info_desc}>{item.desc}</div>
                <div className={styles.article_content_item_info_bottom}>
                  <div className={styles.article_content_item_info_bottom_author}>作者：{item.author}</div>
                  <div className={styles.article_content_item_info_bottom_time}>{item.time}</div>
                  <div className={styles.article_content_item_info_bottom_type}>{item.type}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <SliderBar />
    </div>
  );
}

export default Article;
