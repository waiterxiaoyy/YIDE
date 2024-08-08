// components/ProtectedRoute.tsx
import React, { useEffect, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '@/utils';

interface ProtectedRouteProps {
  element: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenExpired()) {
      // 处理 token 过期的情况，例如重定向到登录页面
      navigate('/login');
    }
  }, [navigate]);

  return element;
};

export default ProtectedRoute;
