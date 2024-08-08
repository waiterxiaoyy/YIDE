import styles from './index.module.less';
import { Editor, Monaco } from '@monaco-editor/react';
import { VscRunCoverage, VscSave, VscCloudDownload } from 'react-icons/vsc';
import { RiAddFill, RiSubtractFill } from 'react-icons/ri';
import { useRef, useState } from 'react';
import { fileStore } from '@/store/fileStore';
import api from '@/api';
import { toast } from 'react-toastify';
import { File } from '@/types';
import { getType } from '@/utils';
import { MenuItem, Select } from '@material-ui/core';
import Toolbar from '../mdEdit/toolbar';

export default function IEditor({ callBackReload }: { callBackReload: () => void }) {
  const [fontSize, setFontSize] = useState<number>(18);

  const fileId = fileStore(state => state.fileId);
  const fileName = fileStore(state => state.fileName);
  const fileType = fileStore(state => state.fileType);
  const fileContent = fileStore(state => state.fileContent[fileId]?.content);
  const saveStatus = fileStore(state => state.fileContent[fileId]?.saveStatus);
  const filesList = fileStore(state => state.filesList);
  const setStoreSeletedHtmlFile = fileStore(state => state.setSeletedHtmlFile);
  const setFileContent = fileStore(state => state.setFileContent);
  const setSaveStatus = fileStore(state => state.setSaveStatus);
  const setMdFile = fileStore(state => state.setMdFile);
  const seletedStoreHtmlFile = fileStore(state => state.seletedHtmlFile);

  const [seletedHtmlFile, setSeletedHtmlFile] = useState<string>(seletedStoreHtmlFile);

  const editorLanguageType = getType(fileType);

  const editorRef = useRef<Monaco | null>(null);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;

    // 添加 Ctrl+S 快捷键
    editor?.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      handleRun();
    });
  };

  const wrapText = (before: string, after: string = '') => {
    const editor = editorRef.current;
    if (editor) {
      const selection = editor.getSelection();
      if (selection) {
        const text = editor.getModel()?.getValueInRange(selection) || '';
        editor.executeEdits('', [
          {
            range: selection,
            text: before + text + after,
            forceMoveMarkers: true
          }
        ]);
      }
    }
  };

  const handleChange = (event?: React.ChangeEvent<HTMLInputElement>, type?: 'increase' | 'decrease') => {
    if (event) {
      setFontSize(Number(event.target.value));
    } else if (type === 'increase') {
      setFontSize(prevFontSize => Math.min(prevFontSize + 1, 50));
    } else if (type === 'decrease') {
      setFontSize(prevFontSize => Math.max(prevFontSize - 1, 16));
    }
  };

  const handleValueChange = (value: string | undefined, fileName: string) => {
    setFileContent(fileId, fileName, value ? value : '');
    setSaveStatus(fileId, fileName, false);
  };

  const handleSaveFile = async () => {
    if (!fileName || !fileType) {
      toast.error('Please select a file first', {
        position: 'top-center',
        autoClose: 1000
      });
      return;
    }
    const data = await api.updateFile(fileId, fileName, fileType, fileContent);

    if (data) {
      setSaveStatus(fileId, fileName, true);
    }
  };

  const handleRun = async () => {
    const unsavedFiles = Object.entries(fileStore.getState().fileContent).filter(([_, value]) => !value.saveStatus);

    const unsaveFileList: File.FileItem[] = [];

    unsavedFiles.forEach(([fileId, value]) => {
      unsaveFileList.push({
        id: Number(fileId),
        name: value.name,
        type: value.name.split('.')[1],
        content: value.content
      });
    });

    const data = await api.updateFileList(unsaveFileList);

    if (data) {
      // 更改所有的保存状态
      Object.keys(fileStore.getState().fileContent).forEach(fileId => {
        setSaveStatus(Number(fileId), fileStore.getState().fileContent[Number(fileId)].name, true);
      });
      callBackReload();
    }
  };

  const handleDownload = async () => {
    if (!fileName || !fileType) {
      toast.error('Please select a file first', {
        position: 'top-center',
        autoClose: 1000
      });
      return;
    }
    const data = await api.downloadFile(fileId, fileName, fileType);
    console.log(data);
  };

  const handleSeletedComplileChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
    await setStoreSeletedHtmlFile(event.target.value as string);
    setSeletedHtmlFile(event.target.value as string);
    const name = event.target.value as string;
    if (name.toString().endsWith('.md')) {
      filesList.map(file => {
        if (file.name === name) {
          setMdFile(file);
        }
      });
    }
  };

  const handleBold = () => {
    wrapText('**', '**');
  };

  // const handleHeading = (level: number) => {
  //   const editor = editorRef.current;
  //   if (editor) {
  //     const selection = editor.getSelection();
  //     if (selection) {
  //       const text = editor.getModel()?.getValueInRange(selection) || '';
  //       editor.executeEdits('', [
  //         {
  //           range: selection,
  //           text: `${'#'.repeat(level)} ${text}`,
  //           forceMoveMarkers: true
  //         }
  //       ]);
  //     }
  //   }
  // };

  const handleLink = () => {
    wrapText('[', '](url)');
  };

  const handleQuote = () => {
    const editor = editorRef.current;
    if (editor) {
      const selection = editor.getSelection();
      if (selection) {
        const text = editor.getModel()?.getValueInRange(selection) || '';
        const lines = text
          .split('\n')
          .map((line: any) => `> ${line}`)
          .join('\n');
        editor.executeEdits('', [
          {
            range: selection,
            text: lines,
            forceMoveMarkers: true
          }
        ]);
      }
    }
  };

  const handleInlineCode = () => {
    wrapText('`', '`');
  };

  const handleCodeBlock = () => {
    const editor = editorRef.current;
    if (editor) {
      const selection = editor.getSelection();
      if (selection) {
        const text = editor.getModel()?.getValueInRange(selection) || '';
        editor.executeEdits('', [
          {
            range: selection,
            text: `\`\`\`\n${text}\n\`\`\``,
            forceMoveMarkers: true
          }
        ]);
      }
    }
  };

  const handleUnorderedList = () => {
    const editor = editorRef.current;
    if (editor) {
      const selection = editor.getSelection();
      if (selection) {
        const text = editor.getModel()?.getValueInRange(selection) || '';
        const lines = text
          .split('\n')
          .map((line: any) => `- ${line}`)
          .join('\n');
        editor.executeEdits('', [
          {
            range: selection,
            text: lines,
            forceMoveMarkers: true
          }
        ]);
      }
    }
  };

  const handleOrderedList = () => {
    const editor = editorRef.current;
    if (editor) {
      const selection = editor.getSelection();
      if (selection) {
        const text = editor.getModel()?.getValueInRange(selection) || '';
        const lines = text
          .split('\n')
          .map((line: any, index: number) => `${index + 1}. ${line}`)
          .join('\n');
        editor.executeEdits('', [
          {
            range: selection,
            text: lines,
            forceMoveMarkers: true
          }
        ]);
      }
    }
  };

  const handleItalic = () => {
    wrapText('*', '*');
  };

  // const handleHorizontalRule = () => {
  //   const editor = editorRef.current;
  //   if (editor) {
  //     const position = editor.getPosition();
  //     if (position) {
  //       editor.executeEdits('', [
  //         {
  //           range: new monaco.Range(position.lineNumber, 1, position.lineNumber, 1),
  //           text: '---\n',
  //           forceMoveMarkers: true,
  //         },
  //       ]);
  //     }
  //   }
  // };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files) return;
    console.log('files', files);
    const data = await api.uploadImage([files[0]]);
    console.log('uploadedImages', data);
    if (data) {
      const editor = editorRef.current;
      if (editor) {
        const position = editor.getPosition();
        if (position) {
          const { url } = data;

          const imageMarkdown = `![${files[0].name}](${url})`;
          const range = [position.lineNumber, position.column, position.lineNumber, position.column];
          editor.executeEdits('', [
            {
              range: range,
              text: imageMarkdown,
              forceMoveMarkers: true
            }
          ]);
          toast.success('Upload image success', {
            position: 'top-center',
            autoClose: 1000
          });
        }
      }
    } else {
      toast.error('Upload image failed', {
        position: 'top-center',
        autoClose: 1000
      });
    }

    // }
    // 验证是否为图像
    // const uploadedImages = await api.uploadImage([files?: files[0] as File: null]);
    // console.log('uploadedImages', uploadedImages);
    //   const editor = editorRef.current;
    //   if (editor) {
    //     const position = editor.getPosition();
    //     if (position) {
    //       const { url, title } = uploadedImages[0];
    //       const imageMarkdown = `![${title}](${url})`;
    //       const range = [position.lineNumber, position.column, position.lineNumber, position.column];
    //       editor.executeEdits('', [
    //         {
    //           range: range,
    //           text: imageMarkdown,
    //           forceMoveMarkers: true
    //         }
    //       ]);
    //     }
    //   }
    // } else {
    //   }
    // }
    // };
    // fileInput.click();
  };

  const handleButtonClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';
    input.onchange = e => handleImageUpload((e.target as HTMLInputElement).files);
    input.click();
  };

  return (
    <div className={styles.editor}>
      <div className={styles.topBar}>
        <div className={styles.title}>Editor</div>
        <div className={styles.fileName}>{fileName ? fileName : '[Please selete a file]'}</div>
        <div className={styles.toolItemList}>
          <div className={styles.saveStatus}>
            {saveStatus ? (
              <p style={{ color: 'green', fontSize: '16px' }}>Saved</p>
            ) : (
              <p style={{ color: 'red', fontSize: '16px' }}>Unsaved</p>
            )}
          </div>
          <RiSubtractFill className={styles.toolItem} onClick={() => handleChange(undefined, 'decrease')} />
          <input
            type='number'
            min={16}
            max={50}
            value={fontSize}
            onChange={handleChange}
            className={styles.inputField}
          />
          <RiAddFill className={styles.toolItem} onClick={() => handleChange(undefined, 'increase')} />
          <Select
            labelId='page'
            label='Page'
            id='select'
            value={seletedHtmlFile}
            className={styles.selectItem}
            onChange={handleSeletedComplileChange}
          >
            {filesList?.map(file => {
              if (
                (file.type === 'html' && file.name.split('.')[1] === 'html') ||
                (file.type === 'md' && file.name.split('.')[1] === 'md')
              ) {
                return <MenuItem value={file.name}>{file.name}</MenuItem>;
              }
            })}
          </Select>
          <VscRunCoverage className={styles.toolItem} onClick={handleRun} title='Compiled' />
          <VscSave className={styles.toolItem} onClick={handleSaveFile} title='Save' />
          <VscCloudDownload className={styles.toolItem} onClick={handleDownload} title='Download' />
        </div>
      </div>
      <div className={styles.toolbar}>
        <Toolbar
          handleBold={handleBold}
          handleItalic={handleItalic}
          handleLink={handleLink}
          handleQuote={handleQuote}
          handleInlineCode={handleInlineCode}
          handleCodeBlock={handleCodeBlock}
          handleUnorderedList={handleUnorderedList}
          handleOrderedList={handleOrderedList}
          handleImageUpload={handleButtonClick}
        />
      </div>
      <Editor
        theme='vs-dark'
        width='100%'
        height='calc(100% - 92px)'
        options={{
          fontSize: fontSize,
          wordWrap: 'on'
        }}
        path={fileName}
        defaultLanguage={editorLanguageType}
        defaultValue={fileContent}
        onChange={value => handleValueChange(value, fileName)}
        onMount={handleEditorDidMount}
      />
    </div>
  );
}
