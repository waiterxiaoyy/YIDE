import { VscNewFile, VscRefresh, VscCloudUpload } from 'react-icons/vsc';
import styles from './index.module.less';
import { useEffect, useRef, useState } from 'react';
import { File as IFile } from '@/types';
import FileList from './FileList';
import api from '@/api';
import { fileStore } from '@/store/fileStore';
import { userStore } from '@/store/userStore';
import { toast } from 'react-toastify';

export default function Explorer() {
  const [fileList, setFileList] = useState<IFile.FileItem[]>([]);
  const [addNewFile, setAddNewFile] = useState<boolean>(false);
  const setStoreFilesList = fileStore(state => state.setFilesList);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userName = userStore(state => state.username);

  const [, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      handleUpload();
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    await toast.info('Comming soon', {
      position: 'top-center',
      autoClose: 1000
    });
  };

  const getFiles = async () => {
    setFileList([]);

    if (addNewFile) {
      handleAddNewFile();
    }
    const data: IFile.FileItem[] = await api.getFileList();
    if (!data) {
      return;
    }
    setFileList(data);
    setStoreFilesList(data);
  };

  useEffect(() => {
    getFiles();
  }, []);

  const handleAddNewFile = () => {
    setAddNewFile(!addNewFile);
  };
  return (
    <div className={styles.explorer}>
      <div className={styles.title}>Explorer</div>
      <div className={styles.toolBar}>
        <div className={styles.projectName}>{userName.toUpperCase()}-Project</div>
        <div className={styles.toolItemList}>
          <VscNewFile className={styles.toolItem} onClick={handleAddNewFile} title='Add New File' />
          <VscRefresh className={styles.toolItem} onClick={getFiles} title='Refresh' />
          <VscCloudUpload className={styles.toolItem} title='Upload File' onClick={handleIconClick} />
          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className={styles.content}>
        <FileList fileList={fileList} addNewFile={addNewFile} addCallback={handleAddNewFile} onFilesReload={getFiles} />
      </div>
    </div>
  );
}
