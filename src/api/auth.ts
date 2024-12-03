import { LoginParams, UserInfo } from '../types/user';

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

export const login = async (params: LoginParams): Promise<UserInfo> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(
        u => u.username === params.username && u.password === params.password
      );
      
      if (user) {
        const { password, ...rest } = user;
        resolve({
          ...rest,
          token: 'mock_token_' + Date.now()
        });
      } else {
        reject(new Error('用户名或密码错误'));
      }
    }, 1000);
  });
}; 