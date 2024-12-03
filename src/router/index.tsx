import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Welcome from '../pages/Welcome';
import BasicLayout from '../layouts/BasicLayout';
import NotFound from '../pages/NotFound';
import { RouteGuard } from '../components/common/RouteGuard';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <RouteGuard>
        <Login />
      </RouteGuard>
    ),
  },
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
      }
    ]
  },
  {
    // 处理所有未匹配的路由
    path: '*',
    element: (
      <RouteGuard>
        <NotFound />
      </RouteGuard>
    ),
  }
]);
