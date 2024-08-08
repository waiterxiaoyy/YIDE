import { FileAddNewProps } from '@/types';
import { useState } from 'react';
import styles from './index.module.less';
import { FaCheck } from 'react-icons/fa6';
export default function NewFile(props: FileAddNewProps) {
  const { onEnter, iconDic, placeholder } = props;

  const [fileName, setFileName] = useState<string>('');

  let type: string;
  const handleKeyPress = (event?: React.KeyboardEvent<HTMLInputElement>, e?: 'click') => {
    if (event?.key === 'Enter' || e === 'click') {
      const fileTypeMap: Record<string, string> = {
        '.py': 'python',
        '.css': 'css',
        '.html': 'html',
        '.js': 'javascript',
        '.java': 'java',
        '.c': 'cpp',
        '.cpp': 'cpp',
        '.sass': 'sass',
        '.less': 'less'
      };

      Object.keys(fileTypeMap).forEach(ext => {
        if (fileName.endsWith(ext)) {
          type = fileTypeMap[ext] || 'other';
        }
      });
      if (!type) {
        type = 'other';
      }
      onEnter(fileName, type);
    }
  };

  const IconComponent = iconDic['other'];
  return (
    <div className={styles.newFile}>
      <IconComponent className={styles.newFileIcon} />
      <input
        className={styles.inputField}
        placeholder={placeholder}
        onChange={e => setFileName(e.target.value)}
        value={fileName}
        onKeyDown={handleKeyPress}
      />
      {fileName ? <FaCheck className={styles.toolItem} onClick={() => handleKeyPress(undefined, 'click')} /> : null}
    </div>
  );
}
