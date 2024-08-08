import { File } from "@/types";
import storage from "@/utils/storage";
import { create } from "zustand";

export const fileStore = create<{
    filesList: File.FileItem[],
    seletedHtmlFile: string,
    fileId: number,
    fileName: string,
    fileType: string,
    mdFile: File.FileItem,
    fileContent: Record<number, { name: string, content: string, saveStatus: boolean }>,
    setFileId: (fileId: number) => void,
    setSeletedHtmlFile: (seletedHtmlFile: string) => void,
    setFilesList: (filesList: File.FileItem[]) => void,
    setFileName: (fileName: string) => void,
    setFileType: (fileType: string) => void,
    setFileContent: (fileid: number, fileName: string, content: string) => void,
    setSaveStatus: (fileid: number, fileName: string, saveStatus: boolean) => void,
    setMdFile: (mdFile: File.FileItem) => void,
}>(set => ({
    fileId: 0,
    filesList: [],
    seletedHtmlFile: storage.get('seletedHtmlFile') || 'index.html',
    fileName: '',
    fileType: '',
    fileContent: {},
    mdFile: storage.get('mdFile') ||
    {
        id: 0,
        name: '',
        type: '',
    },
    setFileId: (fileId: number) => set({ fileId }),
    setSeletedHtmlFile: (seletedHtmlFile: string) => set({ seletedHtmlFile }),
    setFilesList: (filesList: File.FileItem[]) => set({ filesList }),
    setFileName: (fileName: string) => set({ fileName }),
    setFileType: (fileType: string) => set({ fileType }),
    setFileContent: (fileid: number, fileName: string, content: string) => set(state => ({
        fileContent: {
            ...state.fileContent,
            [fileid]: {
                name: fileName,
                content,
                saveStatus: state.fileContent[fileid]?.saveStatus || false
            }
        }
    })),
    setSaveStatus: (fileid: number, fileName: string, saveStatus: boolean) => set(state => ({
        fileContent: {
            ...state.fileContent,
            [fileid]: {
                name: fileName,
                content: state.fileContent[fileid]?.content || '',
                saveStatus
            }
        }
    })),
    setMdFile: (mdFile: File.FileItem) => set({ mdFile }),
}));
