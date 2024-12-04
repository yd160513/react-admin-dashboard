import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, message } from 'antd';
import UserForm from '@/components/UserForm';
import type { CreateUserParams } from '@/types/user';
import styles from './index.module.scss';

const InitialSetup: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 检查是否允许初始化
    const allowSetup = sessionStorage.getItem('allowInitialSetup');
    if (allowSetup !== 'true') {
      message.error('非法访问');
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (values: CreateUserParams) => {
    try {
      setLoading(true);
      const response = await fetch('/api/system/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const { code, data } = await response.json();
      
      if (code === 200) {
        // 初始化接口直接返回登录信息
        localStorage.setItem('userInfo', JSON.stringify(data.data));
        localStorage.setItem('token', data.token);
        // 清除初始化标记
        sessionStorage.removeItem('allowInitialSetup');
        message.success('系统初始化成功！');
        // 直接导航到欢迎页
        navigate('/welcome', { replace: true });
      } else {
        message.error('初始化失败，请重试');
      }
    } catch (error) {
      console.error('初始化失败:', error);
      message.error('系统初始化失败，请重试');
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