// 系统初始化检查响应
export interface InitialCheckResponse {
  hasUsers: boolean;          // 是否存在用户
  isInitialized: boolean;     // 系统是否已初始化
  allowInitialization: boolean; // 是否允许初始化
}
