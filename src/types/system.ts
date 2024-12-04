// 系统初始化检查响应
export interface SystemInitialStatus {
  hasUsers: boolean;          // 是否存在用户
  isInitialized: boolean;     // 系统是否已初始化
  allowInitialization: boolean; // 是否允许初始化
}

export interface InitializeParams {
  username: string;
  email: string;
  password: string;
}

export interface InitializeResult {
  token: string;
  data: {
    id: string;
    username: string;
    email: string;
    role: string;
  }
}
