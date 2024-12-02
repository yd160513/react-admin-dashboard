import React from 'react';
import type { RouteConfig } from './types';
import HelloPage from '@/pages/hello';

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: <HelloPage />,
    meta: {
      title: 'Hello World',
    },
  },
]; 