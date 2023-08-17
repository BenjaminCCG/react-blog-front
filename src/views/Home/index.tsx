import SliderBar from '@/components/sliderBar';
import styles from './style/index.module.scss';
import { useSetState } from 'react-use';
import { queryArticlePage } from '@/network/api/api';
import { Article } from '@/network/api/api-params-moudle';
import { useBusinessStore } from '@/store/business';
import { Button } from 'antd';
import Loading from '@/components/Loading/index';
function Home() {
  const navigator = useNavigate();

  const handleClick = (id: number) => {
    navigator('/article?id=' + id);
  };
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useSetState({
    pageNum: 1,
    pageSize: 10
  });
  const [articleList, setArticleList] = useState<Article[]>([]);

  const fetchArticlePage = async (typeId?: number) => {
    setLoading(true);
    const res = await queryArticlePage({
      ...pageInfo,
      typeId,
      isAdmin: 1
    });
    setLoading(false);
    if (pageInfo.pageNum === 1) {
      setArticleList(res.records!);
    } else {
      setArticleList([...articleList, ...res.records!]);
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

  const { typeList } = useBusinessStore();

  const [search] = useSearchParams();
  useEffect(() => {
    const typeId = search.get('type');
    fetchArticlePage(Number(typeId) || undefined);
  }, [search.get('type'), pageInfo.pageNum]);

  return (
    <>
      <div className={styles.article_wrap}>
        <div className={styles.article_content}>
          <Loading list={articleList} loading={loading}>
            {articleList.map((item, index) => {
              return (
                <div className={styles.article_content_item} key={index} onClick={() => handleClick(item.id!)}>
                  <img src={item.cover} alt="" />
                  <div className={styles.article_content_item_info}>
                    <div className={styles.article_content_item_info_title}>{item.title}</div>
                    <div className={styles.article_content_item_info_desc}>{item.intro}</div>
                    <div className={styles.article_content_item_info_bottom}>
                      <div className={styles.article_content_item_info_bottom_author}>作者：Benjamin</div>
                      <div className={styles.article_content_item_info_bottom_time}>{item.createTime}</div>
                      <div className={styles.article_content_item_info_bottom_type}>
                        {typeList.find((i) => i.id === item.typeId)?.name}
                      </div>
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
        <SliderBar />
      </div>
    </>
  );
}

export default Home;
