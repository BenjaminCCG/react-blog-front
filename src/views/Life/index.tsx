import styles from './style/index.module.scss';
import { queryLifePage } from '@/network/api/api';
import { Article } from '@/network/api/api-params-moudle';
import { useMount } from 'react-use';

function Home() {
  const [lifeList, setLifeList] = useState<Article[]>([]);

  const pageInfo = {
    pageNum: 1,
    pageSize: 10
  };
  const fetchLifePage = async () => {
    const res = await queryLifePage(pageInfo);
    setLifeList(res.records!);
  };
  useMount(() => {
    fetchLifePage();
  });
  const navigator = useNavigate();

  const lifeClick = (id: number) => {
    navigator('/lifeDetail?id=' + id);
  };
  return (
    <div className={styles.life_wrap}>
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
    </div>
  );
}

export default Home;
