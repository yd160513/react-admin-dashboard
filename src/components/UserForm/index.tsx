import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import type { CreateUserParams } from '@/types/user';
import styles from './index.module.scss';

interface UserFormProps {
  loading?: boolean;
  isInitialAdmin?: boolean; // 是否是首次创建管理员
  onSubmit: (values: CreateUserParams) => void;
}

const UserForm: React.FC<UserFormProps> = ({
  loading = false,
  isInitialAdmin = false,
  onSubmit
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: CreateUserParams) => {
    // 移除确认密码字段
    const { ...submitData } = values;
    onSubmit(submitData);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{ role: isInitialAdmin ? 'admin' : 'user' }}
      className={styles.form}
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[
          { required: true, message: '请输入用户名' },
          { min: 4, message: '用户名至少4个字符' },
          { max: 20, message: '用户名最多20个字符' },
          { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' }
        ]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[
          { required: true, message: '请输入密码' },
          { min: 6, message: '密码至少6个字符' },
          { max: 20, message: '密码最多20个字符' }
        ]}
      >
        <Input.Password placeholder="请输入密码" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="确认密码"
        dependencies={['password']}
        rules={[
          { required: true, message: '请确认密码' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次输入的密码不一致'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="请确认密码" />
      </Form.Item>

      {!isInitialAdmin && (
        <Form.Item
          name="role"
          label="角色"
          rules={[{ required: true, message: '请选择角色' }]}
        >
          <Select>
            <Select.Option value="admin">管理员</Select.Option>
            <Select.Option value="user">普通用户</Select.Option>
          </Select>
        </Form.Item>
      )}

      <Form.Item className={styles.submitItem}>
        <Button 
          type="primary" 
          htmlType="submit" 
          loading={loading} 
          block
        >
          {isInitialAdmin ? '初始化系统' : '创建用户'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm; 