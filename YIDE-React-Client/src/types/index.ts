import { IconType } from "react-icons/lib";

export namespace File {
    export interface FileItem {
        id: number;
        name: string;
        type: string;
        content?: string;
    } 
    
    export interface Icon {
        [key: string]: IconType;
    }
}

export interface FileListProps {
    fileList: File.FileItem[];
    addNewFile: boolean;
    addCallback: () => void;
    onFilesReload: () => void;
}

export interface FileAddNewProps {
    onEnter: (name: string, type: string) => void;
    iconDic: File.Icon;
    placeholder: string;
}

export namespace User {
    export interface User {
        username: string;
        password: string;
    }
}

export interface ImageResult {
    url: string, // 上传后文件的访问 URL
    fields: { // 可能包含一些元数据
        ETag: string, // 文件的 ETag
        Bucket: string, // 存储桶名称
        Key: string, // 文件的路径或 key
        Location: string, // 文件的完整访问路径
    }
}