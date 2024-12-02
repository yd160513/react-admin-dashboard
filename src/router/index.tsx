import React from 'react';
import { createHashRouter } from 'react-router-dom';
import { routes } from './routes';

const router = createHashRouter(routes, {
  future: {
    // 未达到 v7 版本时需要增加的配置
    // v7_skipActionErrorRevalidation: true,
    // v7_partialHydration: true,
    // v7_normalizeFormMethod: true,
    // v7_fetcherPersist: true,
    // v7_relativeSplatPath: true,
    // v7_startTransition: true
  }
});

export { router };
export * from './types';
export * from './routes'; 