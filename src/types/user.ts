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

// 创建用户请求参数
export interface CreateUserParams {
  username: string;
  password: string;
  email: string;
  role?: string;
  department?: string;
}

// 创建用户响应
export interface CreateUserResponse {
  success: boolean;
  data?: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
  token?: string;  // 首次创建管理员时会返回token
  message?: string;
} 