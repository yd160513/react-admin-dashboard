import type { SystemInitialStatus, InitializeParams, InitializeResult } from '@/types/system';

export const checkSystemInitialStatus = async (): Promise<SystemInitialStatus> => {
  const response = await fetch('/api/system/check-initial', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`API请求失败: ${response.status}`);
  }

  const result = await response.json();
  
  if (result.code !== 200) {
    throw new Error(result.message || '系统检查失败');
  }

  return result.data;
};

export const initializeSystem = async (params: InitializeParams): Promise<InitializeResult> => {
  const response = await fetch('/api/system/initialize', {
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

  throw new Error(result.message || '系统初始化失败');
};