import SliderBar from '@/components/sliderBar';
import styles from './style/index.module.scss';
import { MdPreview, MdCatalog } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';

function Article() {
  const [id] = useState('preview-only');
  const [scrollElement] = useState(document.getElementById('md')!);
  const [text] = useState('hello md-editor-rt！');
  return (
    <div className={styles.article_wrap}>
      <div className={styles.article_content} id="md">
        <h2>标题</h2>
        <MdPreview editorId={id} modelValue={text} previewTheme="smart-blue" />
        <MdCatalog editorId={id} scrollElement={scrollElement} />
      </div>
      <SliderBar />
    </div>
  );
}

export default Article;
