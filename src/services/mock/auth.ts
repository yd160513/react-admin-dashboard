import type { MockMethod } from 'vite-plugin-mock';

// 模拟用户数据
const mockUsers = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: 'admin' as const
  },
  {
    id: '2',
    username: 'user',
    password: 'user123',
    role: 'user' as const
  }
];

export default [
  {
    url: '/api/auth/login',
    method: 'post',
    response: ({ body }) => {
      try {
        const user = mockUsers.find(
          u => u.username === body.username && u.password === body.password
        );

        if (user) {
          const { password, ...rest } = user;
          return {
            code: 200,
            success: true,
            data: {
              ...rest,
              token: 'mock_token_' + Date.now()
            }
          };
        }

        return {
          code: 401,
          success: false,
          message: '用户名或密码错误'
        };
      } catch (error) {
        return {
          code: 500,
          success: false,
          message: '登录失败'
        };
      }
    }
  }
] as MockMethod[]; 