import SliderBar from '@/components/sliderBar';
import styles from './style/index.module.scss';
import { useMount } from 'react-use';
import { queryArticlePage } from '@/network/api/api';
import { Article } from '@/network/api/api-params-moudle';
import { useBusinessStore } from '@/store/business';
function Home() {
  const navigator = useNavigate();

  const handleClick = (id: number) => {
    navigator('/article?id=' + id);
  };

  const [articleList, setArticleList] = useState<Article[]>([]);
  const pageInfo = {
    pageNum: 1,
    pageSize: 10
  };
  const fetchArticlePage = async (typeId?: number) => {
    const res = await queryArticlePage({
      ...pageInfo,
      typeId,
      isAdmin: 1
    });
    setArticleList(res.records!);
  };
  useMount(() => {
    fetchArticlePage();
  });
  const { typeList } = useBusinessStore();

  const [search] = useSearchParams();
  useEffect(() => {
    const typeId = search.get('type');
    fetchArticlePage(Number(typeId) || undefined);
  }, [search.get('type')]);

  return (
    <div className={styles.article_wrap}>
      <div className={styles.article_content}>
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
      </div>
      <SliderBar />
    </div>
  );
}

export default Home;
