import SliderBar from '@/components/sliderBar';
import styles from './style/index.module.scss';
import { MdPreview } from 'md-editor-rt';
import { queryArticleDetail } from '@/network/api/api';
import { useMount } from 'react-use';

import 'md-editor-rt/lib/preview.css';
import { Article as AT } from '@/network/api/api-params-moudle';
import { useBusinessStore } from '@/store/business';
import { Skeleton } from 'antd';

function Article() {
  const [id] = useState('preview-only');
  const [articleDetail, setArticleDetail] = useState<AT>({
    content: ''
  });
  const [search] = useSearchParams();
  const { typeList } = useBusinessStore();
  const [loading, setLoading] = useState(false);

  useMount(() => {
    setLoading(true);
    queryArticleDetail(Number(search.get('id'))).then((res) => {
      setLoading(false);
      setArticleDetail(res);
    });
  });
  return (
    <div className={styles.article_wrap}>
      {loading ? (
        <Skeleton paragraph={{ rows: 8 }} active />
      ) : (
        <div className={styles.article_content} id="md">
          <h2>{articleDetail.title}</h2>
          <p className={`flex justify-between ${styles.article_info}`}>
            <span>
              分类：
              {typeList.find((i) => i.id === articleDetail.typeId)?.name}
            </span>
            <span>日期：{articleDetail.createTime}</span>
          </p>
          <MdPreview
            editorId={id}
            className={styles.md_preview}
            modelValue={articleDetail.content as string}
            previewTheme="smart-blue"
          />
        </div>
      )}
      <SliderBar />
    </div>
  );
}

export default Article;
