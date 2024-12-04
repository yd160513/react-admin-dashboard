import { mockUsers } from '../mock/auth';
import type { LoginParams, UserInfo } from '../types/auth';

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