import { File, FileListProps } from '@/types';
import styles from './index.module.less';
import { DiPython, DiJavascript1, DiHtml5, DiCss3Full, DiSass, DiLess, DiCode, DiReact } from 'react-icons/di';
import { TbBrandTypescript, TbBrandCpp } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import { VscCloudDownload, VscTrash } from 'react-icons/vsc';
import NewFile from './NewFile';
import api from '@/api';
import ConfirmDialog from '../DiaModal';
import { fileStore } from '@/store/fileStore';

export default function FileList(props: FileListProps) {
  const { fileList, addNewFile, addCallback, onFilesReload } = props;
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<File.FileItem | null>(null);

  const [selectedFileIndex, setSelectedFileIndex] = useState<Number | null>(null);
  const [hoveredFileIndex, setHoveredFileIndex] = useState<number | null>(null);

  const seletedHtmlFile = fileStore(state => state.seletedHtmlFile);
  const setFileId = fileStore(state => state.setFileId);
  const setFileName = fileStore(state => state.setFileName);
  const setFileContent = fileStore(state => state.setFileContent);
  const setFileType = fileStore(state => state.setFileType);

  useEffect(() => {
    if (fileList?.length > 0) {
      if (selectedFileIndex === null) {
        if (seletedHtmlFile) {
          const index = fileList.findIndex(file => file.name === seletedHtmlFile);
          setSelectedFileIndex(index);
          handleSeletctFile(fileList[index], index);
        } else {
          setSelectedFileIndex(0);
          handleSeletctFile(fileList[0], 0);
        }
      } else {
        handleSeletctFile(fileList[selectedFileIndex as number], selectedFileIndex as number);
      }
    }
  }, [fileList]);

  const IconDict: File.Icon = {
    python: DiPython,
    javascript: DiJavascript1,
    js: DiJavascript1,
    html: DiHtml5,
    css: DiCss3Full,
    sass: DiSass,
    less: DiLess,
    cpp: TbBrandCpp,
    typescript: TbBrandTypescript,
    tsx: DiReact,
    other: DiCode
  };

  const handleDeleteClick = (file: File.FileItem) => {
    setFileToDelete(file);
    setDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setDialogOpen(false);
    setFileToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (fileToDelete) {
      const data = await api.deleteFile(fileToDelete.id, fileToDelete.name, fileToDelete.type);
      if (data) {
        onFilesReload();
        handleSeletctFile(fileList[0], 0);
      }
      setDialogOpen(false);
      setFileToDelete(null);
    }
  };

  const handleNewFileEnter = async (name: string, type: string) => {
    const data = await api.createFile(name, type);
    if (data) {
      addCallback();
      onFilesReload();
    }
  };

  const handleDownload = async (file: File.FileItem) => {
    const data = await api.downloadFile(file.id, file.name, file.type);
    console.log(data);
  };

  const handleSeletctFile = async (file: File.FileItem, index: Number) => {
    // console.log('selected file:', file);
    const fileContentStr = await api.getFileContent(file.id, file.name, file.type);
    if (fileContentStr || fileContentStr === '') {
      setFileId(file.id);
      setFileName(file.name);
      setFileContent(file.id, file.name, fileContentStr);
      setFileType(file.type);
    }
    setSelectedFileIndex(index);
  };

  return (
    <div className={styles.fileList}>
      <div className={styles.fileItem}>
        {addNewFile ? (
          <NewFile
            onEnter={(name: string, type: string) => handleNewFileEnter(name, type)}
            iconDic={IconDict}
            placeholder='New File Name'
          />
        ) : (
          ''
        )}
      </div>
      {fileList?.map((file, index) => {
        const IconComponent = IconDict[file.type] || IconDict['other'];
        const isSelected = index === selectedFileIndex;
        const isHovered = index === hoveredFileIndex;

        return (
          <div
            key={file.id} // 确保每个文件项都有唯一的key
            className={`${styles.fileItem} ${isSelected ? styles.selectedFileItem : ''}`}
            onClick={() => handleSeletctFile(file, index)} // 更新选中状态
            onMouseEnter={() => setHoveredFileIndex(index)} // 设置悬停状态
            onMouseLeave={() => setHoveredFileIndex(null)} // 清除悬停状态
          >
            <IconComponent className={styles.fileIcon} />
            <div className={styles.fileName}>{file.name}</div>
            {isHovered && (
              <div className={styles.fileTool}>
                <VscCloudDownload className={styles.toolItem} onClick={() => handleDownload(file)} />
                <VscTrash className={styles.toolItem} onClick={() => handleDeleteClick(file)} />
              </div>
            )}
          </div>
        );
      })}
      <ConfirmDialog
        isOpen={isDialogOpen}
        title='Confirm Deletion'
        message={`Are you sure you want to delete the file "${fileToDelete?.name}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
