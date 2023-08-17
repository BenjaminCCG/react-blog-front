import styles from './style/index.module.scss';
import { MdPreview } from 'md-editor-rt';
import { queryArticleDetail } from '@/network/api/api';
import { useMount } from 'react-use';

import 'md-editor-rt/lib/preview.css';
import { Article as AT } from '@/network/api/api-params-moudle';
import { Skeleton } from 'antd';

function About() {
  const [id] = useState('preview-only');
  const [articleDetail, setArticleDetail] = useState<AT>({
    content: ''
  });
  const [loading, setLoading] = useState(false);
  useMount(() => {
    setLoading(true);
    queryArticleDetail(99999).then((res) => {
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
          <MdPreview
            editorId={id}
            className={styles.md_preview}
            modelValue={articleDetail.content as string}
            previewTheme="smart-blue"
          />
        </div>
      )}
    </div>
  );
}

export default About;
