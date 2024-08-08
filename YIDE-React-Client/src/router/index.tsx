// import IMdEditor from '@/components/mdEdit';
import Login from '@/views/login';
import Main from '@/views/main';
import NotFound from '@/views/notfound/404';
import ProtectedRoute from '@/views/ProtectedRoute';
import { createBrowserRouter, Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute element={<Main />} />
  },
  {
    path: '/main',
    element: <ProtectedRoute element={<Navigate to='/' />} />
  },
  {
    path: '/login',
    element: <Login />
  },
  // {
  //   path: '/editor',
  //   element: <ProtectedRoute element={<IMdEditor />} />
  // },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;
