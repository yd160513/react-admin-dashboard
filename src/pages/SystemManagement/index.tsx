import React from 'react';
import { Outlet } from 'react-router-dom';

const SystemManagement: React.FC = () => {
  return (
    <div>
      <h1>系统管理</h1>
      <Outlet />
    </div>
  );
};

export default SystemManagement; 