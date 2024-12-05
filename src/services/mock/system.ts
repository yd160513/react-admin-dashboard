import type { MockMethod } from 'vite-plugin-mock';
import { mockState } from './state';

interface RequestBody {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface MockContext {
  body: RequestBody;
  query: Record<string, string>;
  headers: Record<string, string>;
}

export default [
  {
    url: '/api/system/check-initial',
    method: 'get',
    response: () => {
      try {
        const userState = mockState.getUserState();
        const isInitialized = !!userState;
        
        return {
          code: 200,
          success: true,
          data: {
            hasUsers: isInitialized,
            isInitialized,
            allowInitialization: !isInitialized
          }
        };
      } catch (error) {
        return {
          code: 500,
          success: false,
          message: '系统检查失败'
        };
      }
    }
  },
  {
    url: '/api/system/initialize',
    method: 'post',
    response: (context: MockContext) => {
      try {
        console.log('initialize', context);
        const { body } = context;
        console.log('body', body);
        const userState = {
          id: '1',
          username: body.username!,
          password: body.password!,
          confirmPassword: body.confirmPassword,
          role: 'admin' as const,
          token: 'mock_token_' + Date.now()
        };
        console.log('userState', userState);
        // 使用 mockState 管理用户状态
        mockState.setUserState(userState);
        console.log('userState', userState);
        return {
          code: 200,
          success: true,
          data: {
            token: userState.token,
            data: userState
          }
        };
      } catch (error) {
        return {
          code: 500,
          success: false,
          message: '初始化失败'
        };
      }
    }
  }
] as MockMethod[]; 