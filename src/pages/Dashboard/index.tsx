import React from 'react';
import { Card, Typography } from 'antd';
import { UserInfo } from '../../types/user';
import styles from './index.module.scss';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const userInfo: UserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  
  return (
    <div className={styles.dashboardContainer}>
      <Card className={styles.welcomeCard}>
        <Title level={3}>
          恭喜{userInfo.role === 'admin' ? '管理员' : '用户'} {userInfo.username} 进入系统
        </Title>
      </Card>
    </div>
  );
};

export default Dashboard; 