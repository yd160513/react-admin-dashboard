import React from 'react';
import { Form, Input, Button, message, Card, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import { LoginParams } from '../../types/user';
import styles from './index.module.scss';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: LoginParams) => {
    try {
      setLoading(true);
      const userInfo = await login(values);
      // 存储用户信息到 localStorage
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      message.success('登录成功！');
      navigate('/welcome');
    } catch (error: any) {
      message.error(error?.message || '登录失败');
    } finally {
      setLoading(false);
    }
  };

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