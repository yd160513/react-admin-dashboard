import type { LoginParams, UserInfo } from '@/types/user';

export const login = async (params: LoginParams): Promise<UserInfo> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });

  const result = await response.json();
  
  if (result.code === 200) {
    return result.data;
  }
  
  throw new Error(result.message || '登录失败');
}; 