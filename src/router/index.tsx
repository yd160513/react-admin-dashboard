import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Welcome from '../pages/Welcome';
import BasicLayout from '../layouts/BasicLayout';
import NotFound from '../pages/NotFound';
import { RouteGuard } from './guards/RouteGuard';
import InitialSetup from '../pages/InitialSetup';
import { lazy, Suspense } from 'react';
import { MenuType } from '../types/menu';
import { fetchMenuList } from '../services/api/menu';

// 懒加载动态组件
const UserList = lazy(() => import('../pages/UserList/index'));
const DepartmentList = lazy(() => import('../pages/DepartmentList/index'));
const LogList = lazy(() => import('../pages/LogList/index'));
const SystemManagement = lazy(() => import('../pages/SystemManagement/index'));
const PermissionManagement = lazy(() => import('../pages/SystemManagement/PermissionManagement/index'));
const RoleManagement = lazy(() => import('../pages/SystemManagement/RoleManagement/index'));
const MenuManagement = lazy(() => import('../pages/SystemManagement/MenuManagement/index'));

// 组件映射表
const componentMap: Record<string, React.ComponentType> = {
  UserList,
  DepartmentList,
  LogList,
  SystemManagement,
  PermissionManagement,
  RoleManagement,
  MenuManagement,
};

interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

// 将菜单配置转换为路由配置
const transformMenuToRoute = (menu: MenuType): RouteConfig => {
  const Component = componentMap[menu.element];
  const route = {
    path: menu.path,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Component />
      </Suspense>
    ),
  };

  if (menu.children) {
    return {
      ...route,
      children: menu.children.map(transformMenuToRoute),
    };
  }

  return route;
};

// 获取动态路由配置
const getDynamicRoutes = async () => {
  const menuList = await fetchMenuList();
  return menuList.map(transformMenuToRoute);
};

export const createRouter = async () => {
  const dynamicRoutes = await getDynamicRoutes();

  return createBrowserRouter([
    {
      path: '/',
      element: (
        <RouteGuard>
          <BasicLayout />
        </RouteGuard>
      ),
      children: [
        {
          path: '',
          element: <Welcome />,
        },
        {
          path: 'welcome',
          element: <Welcome />,
        },
        ...dynamicRoutes,
      ]
    },
    {
      path: '/login',
      element: (
        <RouteGuard>
          <Login />
        </RouteGuard>
      ),
    },
    {
      path: '/initial-setup',
      element: (
        <RouteGuard>
          <InitialSetup />
        </RouteGuard>
      ),
    },
    {
      path: '*',
      element: (
        <RouteGuard>
          <NotFound />
        </RouteGuard>
      ),
    }
  ]);
};
