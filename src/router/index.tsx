import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Welcome from '../pages/Welcome';
import BasicLayout from '../layouts/BasicLayout';
import NotFound from '../pages/NotFound';
import { RouteGuard } from './guards/RouteGuard';
import InitialSetup from '../pages/InitialSetup';

export const router = createBrowserRouter([
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
