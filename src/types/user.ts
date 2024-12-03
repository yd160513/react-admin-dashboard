export interface LoginParams {
  username: string;
  password: string;
}

export interface UserInfo {
  id: string;
  username: string;
  role: 'admin' | 'user';
  token: string;
} 