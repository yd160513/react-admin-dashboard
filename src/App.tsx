import React from 'react';
import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';
import type { Router } from '@remix-run/router';
import zhCN from 'antd/locale/zh_CN';
import { createRouter } from './router';
import { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [router, setRouter] = useState<Router | null>(null);

  useEffect(() => {
    const initRouter = async () => {
      const newRouter = await createRouter();
      setRouter(newRouter);
    };
    initRouter();
  }, []);

  if (!router) {
    return <div>Loading...</div>;
  }

  return (
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
