import type { MockMethod } from 'vite-plugin-mock';

interface RequestBody {
  username?: string;
  email?: string;
  password?: string;
}

interface MockContext {
  body: RequestBody;
  query: Record<string, string>;
  headers: Record<string, string>;
}

// 添加一个模拟存储
const mockStorage = new Map<string, string>();

const mockApis: MockMethod[] = [
  {
    url: '/api/system/check-initial',
    method: 'get',
    response: () => {
      try {
        const isInitialized = mockStorage.get('systemInitialized') === 'true';
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
        const { body } = context;
        mockStorage.set('systemInitialized', 'true');
        
        return {
          code: 200,
          success: true,
          data: {
            token: 'mock_token_' + Date.now(),
            data: {
              id: '1',
              username: body.username,
              email: body.email,
              role: 'admin'
            }
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
];

export default mockApis; 