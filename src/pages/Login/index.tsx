import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Card, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { login, checkSystemInitialStatus } from '@/services';
import { LoginParams } from '@/types/user';
import styles from './index.module.scss';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkInitialSetup = async () => {
      try {
        const result = await checkSystemInitialStatus();
        
        // 如果系统没有用户，并且允许初始化，则跳转到初始化页面。
        // hasUsers: 是否存在用户
        // allowInitialization: 是否允许初始化
        if (!result.hasUsers && result.allowInitialization) {
          
          // 系统初始化是一次性的操作，不需要持久保存，所以使用 sessionStorage。
          // 在初始化成功之后也会调用 sessionStorage.removeItem('allowInitialSetup'); 清除标志。
          sessionStorage.setItem('allowInitialSetup', 'true');
          navigate('/initial-setup', { replace: true });
        }
      } catch (error) {
        console.error('检查系统状态失败:', error);
        message.error('系统检查失败，请刷新页面重试');
      } finally {
        setIsChecking(false);
      }
    };

    checkInitialSetup();
  }, []);

  const onFinish = async (values: LoginParams) => {
    try {
      setLoading(true);
      const userInfo = await login(values);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      message.success('登录成功！');
      navigate('/welcome');
    } catch (error: any) {
      message.error(error?.message || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  if (isChecking) {
    return <div className={styles.loading}>系统检查中...</div>;
  }

  return (
    <div className={styles.loginContainer}>
      <Card title="系统登录" className={styles.loginCard}>
        <Alert
          message="测试账号"
          description={
            <div>
              管理员账号：admin / admin123<br/>
              普通用户：user / user123
            </div>
          }
          type="info"
          showIcon
          style={{ marginBottom: 24 }}
          closable
        />
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="用户名" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login; 