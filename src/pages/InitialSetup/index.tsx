import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, message } from 'antd';
import UserForm from '@/components/UserForm';
import { initializeSystem } from '@/services';
import type { CreateUserParams } from '@/types/user';
import styles from './index.module.scss';

const InitialSetup: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 检查是否允许初始化，客户端检查，防止用户直接访问初始化页面
    const allowSetup = sessionStorage.getItem('allowInitialSetup');
    if (allowSetup !== 'true') {
      message.error('非法访问');
      navigate('/login', { replace: true });
    }
  }, []);

  const handleSubmit = async (values: CreateUserParams) => {
    try {
      setLoading(true);
      const result = await initializeSystem(values);
      
      localStorage.setItem('userInfo', JSON.stringify(result.data));
      localStorage.setItem('token', result.token);
      // 初始化成功后，清除允许初始化的标志
      sessionStorage.removeItem('allowInitialSetup');
      message.success('系统初始化成功！');
      navigate('/welcome', { replace: true });
    } catch (error: any) {
      console.error('初始化失败:', error);
      message.error(error?.message || '系统初始化失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card title="系统初始化" className={styles.card}>
        <p className={styles.tip}>
          欢迎使用本系统！请创建管理员账号以完成系统初始化。
        </p>
        <UserForm 
          isInitialAdmin
          loading={loading}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
};

export default InitialSetup; 