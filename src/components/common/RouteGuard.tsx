import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RouteGuardProps {
  children: React.ReactNode;
}

/**
 * 路由守卫
 * 业务逻辑: 
 *  1. 如果用户未登录(无 userInfo)且当前页面不是登录页,则重定向到登录页
 *  2. 如果用户已登录且当前在登录页,则重定向到欢迎页
 *  3. 其他情况下正常渲染子组件
 */
export const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const userInfo = localStorage.getItem('userInfo');
  const location = useLocation();

  if (!userInfo && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  if (userInfo && location.pathname === '/login') {
    return <Navigate to="/welcome" replace />;
  }

  return <>{children}</>;
};
