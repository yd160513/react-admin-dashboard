import React from 'react';
import { Card, Typography } from 'antd';
import { UserInfo } from '@/types/user';
import styles from './index.module.scss';

const { Title } = Typography;

const Welcome: React.FC = () => {
  const userInfo: UserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  
  return (
    <Card className={styles.welcomeCard}>
      <Title level={3}>
        欢迎{userInfo.role === 'admin' ? '管理员' : '用户'} {userInfo.username} 登录系统
      </Title>
    </Card>
  );
};

export default Welcome; 