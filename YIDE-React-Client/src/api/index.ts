import request from "@/utils/request"
import { File, ImageResult, User } from "@/types"

export default {
    getFileList () {
        return request.post<File.FileItem[]>('/fileList')
    },
    getFileContent (id:number, name: string, type: string) {
        console.log('name', name)
        return request.post<string>('/fileContent', {id, name, type})
    },  
    createFile (name: string, type: string) {
        return request.post<File.FileItem>('/createFile', {name, type})
    },
    deleteFile (id: number, name: string, type: string) {
        return request.post<File.FileItem>('/deleteFile', {id, name, type})
    },
    downloadFile (id: number, name: string, type: string) {
        return request.downloadFile('/download', {id, name, type}, name)
    },
    updateFile(id:number, name: string, type: string, content: string) {
        return request.post<File.FileItem>('/updateFile', {id, name, type, content})
    },
    updateFileList(fileList: File.FileItem[]) {
        return request.post<File.FileItem[]>('/updateFileList', {fileList})
    },
    login(params:User.User) {
        return request.post('/login', params)
    },
    getUserInfo() {
        return request.get<User.User>('/getUser')
    },
    getCompile(compileFileName: string) {
        return request.post<string>('/compile', {compileFileName})
    },
    uploadImage(image: File[]) {
        return request.upload<ImageResult>('/upload', image)
    }
}