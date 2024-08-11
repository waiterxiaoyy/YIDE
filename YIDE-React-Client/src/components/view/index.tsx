import { useEffect, useState } from 'react';
import styles from './index.module.less';
import { fileStore } from '@/store/fileStore';
import api from '@/api';

import gfm from '@bytemd/plugin-gfm';
import gemoji from '@bytemd/plugin-gemoji';
import highlight from '@bytemd/plugin-highlight-ssr';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import { Viewer } from '@bytemd/react';
import 'bytemd/dist/index.min.css';
import 'highlight.js/styles/vs.css';
import 'juejin-markdown-themes/dist/smartblue.min.css';
import 'highlightjs/styles/atom-one-dark-reasonable.css';
import frontmatter from '@bytemd/plugin-frontmatter';

const plugins = [frontmatter(), gfm(), gemoji(), highlight(), mediumZoom()];

export default function IView({ reloadKey }: { reloadKey: number }) {
  const [iframeKey, setIframeKey] = useState(Math.random());

  const [htmlContent, setHtmlContent] = useState<string>('');

  const [mdContent, setMdContent] = useState<string>('');

  const compileFileName = fileStore(state => state.seletedHtmlFile);

  const mdFile = fileStore(state => state.mdFile);

  const type = compileFileName.split('.').pop() || 'html';

  const getHtml = async () => {
    const data = await api.getCompile(compileFileName);
    if (data) {
      setHtmlContent(data);
    }
  };

  const getMdContent = async () => {
    const data = await api.getFileContent(mdFile.id, mdFile.name, mdFile.type);
    if (data) {
      setMdContent(data);
    }
  };

  useEffect(() => {
    setIframeKey(reloadKey);

    // setFileType(type);
    if (type === 'html') {
      getHtml();
    }
    if (type === 'md') {
      getMdContent();
    }
    // getHtml();
  }, [reloadKey]);

  return (
    <div className={styles.view}>
      {type === 'html' ? (
        <iframe
          key={iframeKey}
          srcDoc={htmlContent}
          style={{ height: '100%', width: '100%', border: 'none' }}
          title='output'
        ></iframe>
      ) : (
        <div className={styles.mdContent}>
          <Viewer value={mdContent} plugins={plugins} />
        </div>
      )}
    </div>
  );
}
