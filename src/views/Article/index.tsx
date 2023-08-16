import SliderBar from '@/components/sliderBar';
import styles from './style/index.module.scss';
import { MdPreview } from 'md-editor-rt';
import { queryArticleDetail } from '@/network/api/api';
import { useMount } from 'react-use';

import 'md-editor-rt/lib/preview.css';
import { Article as AT } from '@/network/api/api-params-moudle';
import { useBusinessStore } from '@/store/business';

function Article() {
  const [id] = useState('preview-only');
  // const [scrollElement] = useState(document.getElementById('md')!);
  const [articleDetail, setArticleDetail] = useState<AT>({
    content: ''
  });
  const [search] = useSearchParams();
  const { typeList } = useBusinessStore();

  useMount(() => {
    queryArticleDetail(Number(search.get('id'))).then((res) => {
      setArticleDetail(res);
    });
  });
  return (
    <div className={styles.article_wrap}>
      <div className={styles.article_content} id="md">
        <h2>{articleDetail.title}</h2>
        <p className=" flex justify-between">
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
        {/* <MdCatalog editorId={id} scrollElement={scrollElement} /> */}
      </div>
      <SliderBar />
    </div>
  );
}

export default Article;
