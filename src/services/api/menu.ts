import type { MenuType } from '@/types/menu';

export const fetchMenuList = async (): Promise<MenuType[]> => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  
  const response = await fetch('/api/system/menus', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userInfo.token}`
    }
  });
  
  const result = await response.json();
  
  if (result.code === 200) {
    return result.data;
  }
  
  throw new Error(result.message || '获取菜单失败');
}; 