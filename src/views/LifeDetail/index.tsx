import styles from './style/index.module.scss';
import { queryLifeDetail } from '@/network/api/api';
import { useMount } from 'react-use';

import 'md-editor-rt/lib/preview.css';
import { Article } from '@/network/api/api-params-moudle';

function LifeDetail() {
  const [lifeDetail, setlifeDetail] = useState<Article>({
    content: ''
  });
  const [search] = useSearchParams();

  useMount(() => {
    queryLifeDetail(Number(search.get('id'))).then((res) => {
      setlifeDetail(res);
    });
  });
  return (
    <div className={styles.article_wrap}>
      <div className={styles.article_content} id="md">
        <h2>{lifeDetail.title}</h2>
        <p className=" flex justify-between">
          <span>作者：Benjamin</span>
          <span>日期：{lifeDetail.createTime}</span>
        </p>
        <div
          className={styles.editor_wrapper}
          dangerouslySetInnerHTML={{
            __html: lifeDetail.content as string
          }}
        ></div>
      </div>
    </div>
  );
}

export default LifeDetail;
