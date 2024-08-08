import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import storage from "./storage";

const instance = axios.create({
    baseURL: "/api",
    timeout: 8000,
    timeoutErrorMessage: "请求超时",
});

const MAX_CONTENT_SIZE = 3 * 1024 * 1024; // 3MB

instance.interceptors.request.use(
    (config) => {
        const token = storage.get('token');
        if (token) {
            config.headers['token'] = token;
        }
        if (config.data) {
            const contentLength = JSON.stringify(config.data).length;

            if (contentLength > MAX_CONTENT_SIZE) {
                const error = new Error('请求内容太大，拒绝发送请求');
                toast.error(error.message, {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                });
                return Promise.reject(error);
            }
        }

        return config;
    },
    (error: AxiosError) => {
        toast.error(error.message, {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        });
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        const data = response.data;
        
        if (response.config.responseType === 'blob') return response
        if(data.code === 401) {
            toast.error(data.msg,{
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'
            });
            window.location.href = '/login';
        }
        else if (data.code === 300) {
            toast.success(data.msg, {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'
            });
        } else if (data.code !== 200) {
            toast.error(data.msg,{
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'
            });
        } else if (data.code === 200) {
            if(data.msg !== 'success'){
                toast.success(data.msg, {
                    position: 'top-center',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                });
            }
            return data.data;
        }
    },
    (error: AxiosError) => {
        toast.error(error.message);
        return Promise.reject(error);
    }
);

export default {
    get<T>(url: string, params?: object): Promise<T> {
        return instance.get(url, { params })
    },
    post<T>(url: string, data?: object): Promise<T> {
        return instance.post(url, data)
    },
    downloadFile(url: string, data: any, fileName = 'fileName.js') {
        instance({
            url,
            data,
            method: 'post',
            responseType: 'blob'
          }).then(response => {
            const blob = new Blob([response.data], {
              type: response.data.type
            })
            const name = (response.headers['file-name'] as string) || fileName
            const link = document.createElement('a')
            link.download = decodeURIComponent(name)
            link.href = URL.createObjectURL(blob)
            document.body.append(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(link.href)
          })
        },
    upload<T>(url:string, image: File[]): Promise<T> {
        const targetDir = 'sites/images/';
         // 创建 FormData 对象，用于发送文件和目标目录
        const formData = new FormData();
        formData.append('file', image[0]);
        formData.append('targetDir', targetDir);
        // 上传文件到服务器
        return instance.post(url, formData)
    }
}



