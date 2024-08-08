// import { useState } from 'react';

// import { Editor } from '@bytemd/react';

// import 'bytemd/dist/index.min.css';
// // import 'highlight.js/styles/vs.css';

// export default function IMdEditor() {
//   const [value, setValue] = useState<string>('');

//   const handleValueCancel = (v: string) => {
//     setValue(v);
//   };

//   const uploadImages = async (files: File[]): Promise<{ title: string; url: string }[]> => {
//     try {
//       const targetDir = 'sites/images/';
//       const result = await Promise.all(
//         files.map(async file => {
//           // 创建 FormData 对象，用于发送文件和目标目录
//           const formData = new FormData();
//           formData.append('file', file);
//           formData.append('targetDir', targetDir);

//           // 上传文件到服务器
//           const res = await fetch('http://xiaorongshu.cc:8000/api/upload', {
//             // 替换为你的后端IP和端口
//             method: 'POST',
//             body: formData
//           });

//           if (!res.ok) {
//             throw new Error('Network response was not ok');
//           }

//           // 解析服务器响应
//           const data = await res.json();
//           // 返回文件的标题和URL
//           return {
//             title: file.name,
//             url: data.url || '' // `data.url` 可能为 undefined，因此提供默认值
//           };
//         })
//       );
//       return result;
//     } catch (error) {
//       console.error('Upload failed:', error);
//       return [];
//     }
//   };

//   return (
//     <>
//       <Editor value={value} onChange={v => handleValueCancel(v)} uploadImages={uploadImages} />
//       <div className='bytemd-toolbar'>
//         <div className='bytemd-toolbar-icon bytemd-tippy' bytemd-tippy-path='0'>
//           <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' fill='none' viewBox='0 0 48 48'>
//             <path
//               stroke='currentColor'
//               stroke-linecap='round'
//               stroke-linejoin='round'
//               stroke-width='4'
//               d='M12 5v38M36 5v38M12 24h24'
//             ></path>
//           </svg>
//         </div>
//         <div className='bytemd-toolbar-left'>
//           <div className='bytemd-toolbar-icon bytemd-tippy' bytemd-tippy-path='1'>
//             <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' fill='none' viewBox='0 0 48 48'>
//               <path
//                 stroke='currentColor'
//                 stroke-linecap='round'
//                 stroke-linejoin='round'
//                 stroke-width='4'
//                 d='M24 24c5.506 0 9.969-4.477 9.969-10S29.506 4 24 4H11v20h13ZM28.031 44C33.537 44 38 39.523 38 34s-4.463-10-9.969-10H11v20h17.031Z'
//                 clip-rule='evenodd'
//               ></path>
//             </svg>
//           </div>
//           <div className='bytemd-toolbar-icon bytemd-tippy' bytemd-tippy-path='2'>
//             <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' fill='none' viewBox='0 0 48 48'>
//               <path
//                 stroke='currentColor'
//                 stroke-linecap='round'
//                 stroke-linejoin='round'
//                 stroke-width='4'
//                 d='M20 6h16M12 42h16M29 5.952 19 42'
//               ></path>
//             </svg>
//           </div>
//           <div className='bytemd-toolbar-icon bytemd-tippy' bytemd-tippy-path='3'>
//             <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' fill='none' viewBox='0 0 48 48'>
//               <path
//                 fill='currentColor'
//                 fill-rule='evenodd'
//                 d='M18.853 9.116C11.323 13.952 7.14 19.58 6.303 26.003 5 36 13.94 40.893 18.47 36.497 23 32.1 20.285 26.52 17.005 24.994c-3.28-1.525-5.286-.994-4.936-3.033.35-2.038 5.016-7.69 9.116-10.322a.749.749 0 0 0 .114-1.02L20.285 9.3c-.44-.572-.862-.55-1.432-.185ZM38.679 9.116c-7.53 4.836-11.714 10.465-12.55 16.887-1.303 9.997 7.637 14.89 12.167 10.494 4.53-4.397 1.815-9.977-1.466-11.503-3.28-1.525-5.286-.994-4.936-3.033.35-2.038 5.017-7.69 9.117-10.322a.749.749 0 0 0 .113-1.02L40.11 9.3c-.44-.572-.862-.55-1.431-.185Z'
//                 clip-rule='evenodd'
//               ></path>
//             </svg>
//           </div>
//           <div className='bytemd-toolbar-icon bytemd-tippy' bytemd-tippy-path='4'>
//             <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' fill='none' viewBox='0 0 48 48'>
//               <path
//                 stroke='currentColor'
//                 stroke-linecap='round'
//                 stroke-linejoin='round'
//                 stroke-width='4'
//                 d='m26.24 16.373-9.14-9.14c-2.661-2.661-7.035-2.603-9.768.131-2.734 2.734-2.793 7.107-.131 9.768l7.935 7.936M32.903 23.003l7.935 7.935c2.661 2.662 2.603 7.035-.13 9.769-2.735 2.734-7.108 2.792-9.77.13l-9.14-9.14'
//               ></path>
//               <path
//                 stroke='currentColor'
//                 stroke-linecap='round'
//                 stroke-linejoin='round'
//                 stroke-width='4'
//                 d='M26.11 26.142c2.733-2.734 2.792-7.108.13-9.769M21.799 21.798c-2.734 2.734-2.792 7.108-.131 9.769'
//               ></path>
//             </svg>
//           </div>
//           <div className='bytemd-toolbar-icon bytemd-tippy' bytemd-tippy-path='6'>
//             <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' fill='none' viewBox='0 0 48 48'>
//               <path
//                 stroke='currentColor'
//                 stroke-linecap='round'
//                 stroke-linejoin='round'
//                 stroke-width='4'
//                 d='M16 13 4 25.432 16 37M32 13l12 12.432L32 37'
//               ></path>
//               <path stroke='currentColor' stroke-linecap='round' stroke-width='4' d='m28 4-7 40'></path>
//             </svg>
//           </div>
//           <div className='bytemd-toolbar-icon bytemd-tippy' bytemd-tippy-path='7'>
//             <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' fill='none' viewBox='0 0 48 48'>
//               <path
//                 stroke='currentColor'
//                 stroke-linecap='round'
//                 stroke-linejoin='round'
//                 stroke-width='4'
//                 d='M16 4c-2 0-5 1-5 5v9c0 3-5 5-5 5s5 2 5 5v11c0 4 3 5 5 5M32 4c2 0 5 1 5 5v9c0 3 5 5 5 5s-5 2-5 5v11c0 4-3 5-5 5'
//               ></path>
//             </svg>
//           </div>
//           <div className='bytemd-toolbar-icon bytemd-tippy' bytemd-tippy-path='8'>
//             <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' fill='none' viewBox='0 0 48 48'>
//               <path
//                 stroke='currentColor'
//                 stroke-linejoin='round'
//                 stroke-width='4'
//                 d='M9 42a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM9 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM9 28a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'
//               ></path>
//               <path
//                 stroke='currentColor'
//                 stroke-linecap='round'
//                 stroke-linejoin='round'
//                 stroke-width='4'
//                 d='M21 24h22M21 38h22M21 10h22'
//               ></path>
//             </svg>
//           </div>
//           <div className='bytemd-toolbar-icon bytemd-tippy' bytemd-tippy-path='9'>
//             <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' fill='none' viewBox='0 0 48 48'>
//               <path
//                 stroke='currentColor'
//                 stroke-linecap='round'
//                 stroke-linejoin='round'
//                 stroke-width='4'
//                 d='M9 4v9M12 13H6M12 27H6M6 20s3-3 5 0-5 7-5 7M6 34.5s2-3 5-1 0 4.5 0 4.5 3 2.5 0 4.5-5-1-5-1M11 38H9M9 4 6 6M21 24h22M21 38h22M21 10h22'
//               ></path>
//             </svg>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
