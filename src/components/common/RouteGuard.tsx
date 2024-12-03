import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { RouteConfig } from '@/router/types';

interface RouteGuardProps {
  children: React.ReactElement;
  config: RouteConfig;
}

export const RouteGuard: React.FC<RouteGuardProps> = ({ children, config }) => {
  const location = useLocation();
  const { meta } = config;

  // 设置页面标题
  if (meta?.title) {
    document.title = meta.title;
  }

  // 权限验证示例
  if (meta?.requiresAuth) {
    const isAuthenticated = localStorage.getItem('token');
    if (!isAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  return children;
};
