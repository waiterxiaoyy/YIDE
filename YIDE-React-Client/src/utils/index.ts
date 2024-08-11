import storage from "./storage";


export function getType(value: string) {
    if(value === 'js' || value === 'javascript') {
        return 'javascript';
    } else if (value === 'css') {
        return 'css';
    } else if (value === 'html' || value === 'jsx') {
        return 'html';
    } else if (value === 'md' || value === 'markdown') {
        return 'markdown';
    } else if (value === 'py') {
        return 'python';
    } else if (value === 'java') {
        return 'java';
    } else if (value === 'c' || value === 'cpp') {
        return 'cpp';
    } else if (value === 'sass') {
        return 'sass';
    } else if (value === 'less') {
        return 'less';
    } else if (value === 'ts' || value === 'tsx') {
        return 'typescript';
    } else if (value === 'json') {
        return 'json';
    } else if (value === 'md') {
        return 'markdown';
    } else if (value === 'sql') {
        return 'sql';
    } else if (value === 'sh' || value === 'shell') {
        return 'shell';
    } else if (value === 'yaml' || value === 'yml') {
        return 'yaml';
    } else if (value === 'xml') {
        return 'xml';
    } else if (value === 'php') { 
        return 'php';
    } else if (value === 'go') {
        return 'go';
    } else if (value === 'rb' || value === 'ruby') {
        return 'ruby';
    } else if (value === 'swift') {
        return 'swift';
    } else if (value === 'rust') {
        return 'rust';
    } else if (value === 'scala') {
        return 'scala';
    } else if (value === 'kotlin') {
        return 'kotlin';
    } else if (value === 'perl') {
        return 'perl';
    } else if (value === 'lua') {
        return 'lua';
    } else if (value === 'dart') { 
        return 'dart';
    } else if (value === 'r') {
        return 'r';
    } else {
        return 'other'
    }
    
}

export const isTokenExpired = () => {
    const token = storage.get('token');
    if (!token) return true;
  
    // 假设 token 是一个 JWT，可以解析它来检查过期时间
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000; // exp 是 Unix 时间戳，以秒为单位
    return Date.now() > exp;
  }