import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Welcome from '../pages/Welcome';
import BasicLayout from '../layouts/BasicLayout';
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
  }
]);
