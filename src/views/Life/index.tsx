import Loading from '@/components/Loading';
import styles from './style/index.module.scss';
import { queryLifePage } from '@/network/api/api';
import { Article } from '@/network/api/api-params-moudle';
import { Button } from 'antd';
import { useSetState } from 'react-use';

function Home() {
  const [lifeList, setLifeList] = useState<Article[]>([]);

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useSetState({
    pageNum: 1,
    pageSize: 10
  });
  const fetchLifePage = async () => {
    setLoading(true);

    const res = await queryLifePage(pageInfo);
    setLoading(false);

    // setLifeList(res.records!);
    if (pageInfo.pageNum === 1) {
      setLifeList(res.records!);
    } else {
      setLifeList([...lifeList, ...res.records!]);
    }
    setTotal(res.total!);
  };
  const loadMore = () => {
    if (pageInfo.pageNum * pageInfo.pageSize < total) {
      setPageInfo({
        pageNum: pageInfo.pageNum + 1
      });
    }
  };
  useEffect(() => {
    fetchLifePage();
  }, [pageInfo.pageNum]);

  const navigator = useNavigate();

  const lifeClick = (id: number) => {
    navigator('/lifeDetail?id=' + id);
  };
  return (
    <div className={styles.life_wrap}>
      <Loading list={lifeList} loading={loading}>
        {lifeList.map((item, index) => {
          return (
            <div className={styles.life_wrap_item} key={index} onClick={() => lifeClick(item.id!)}>
              <img src={item.cover} alt="" />
              <div className={styles.life_wrap_item_info}>
                <div className={styles.life_wrap_item_info_title}>{item.title}</div>
                <div className={styles.life_wrap_item_info_desc}>{item.intro}</div>
                <div className={styles.life_wrap_item_info_bottom}>
                  <div className={styles.life_wrap_item_info_bottom_author}>作者：Benjamin</div>
                  <div className={styles.life_wrap_item_info_bottom_time}>{item.createTime}</div>
                </div>
              </div>
            </div>
          );
        })}
      </Loading>
      {pageInfo.pageNum * pageInfo.pageSize < total && (
        <Button type="primary" block onClick={loadMore}>
          加载更多数据~
        </Button>
      )}
    </div>
  );
}

export default Home;
