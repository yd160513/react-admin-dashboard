import type { MockMethod } from 'vite-plugin-mock';
import type { MenuType } from '@/types/menu';

const mockMenuList: MenuType[] = [
  {
    path: '/users',
    element: 'UserList',
    meta: {
      title: '用户列表'
    }
  },
  {
    path: '/departments',
    element: 'DepartmentList',
    meta: {
      title: '部门列表'
    }
  },
  {
    path: '/logs',
    element: 'LogList',
    meta: {
      title: '日志列表'
    }
  },
  {
    path: '/system',
    element: 'SystemManagement',
    meta: {
      title: '系统管理'
    },
    children: [
      {
        path: 'permissions',
        element: 'PermissionManagement',
        meta: {
          title: '权限管理'
        }
      },
      {
        path: 'roles',
        element: 'RoleManagement',
        meta: {
          title: '角色管理'
        }
      },
      {
        path: 'menus',
        element: 'MenuManagement',
        meta: {
          title: '菜单管理'
        }
      }
    ]
  }
];

export default [
  {
    url: '/api/system/menus',
    method: 'get',
    response: () => {
      return {
        code: 200,
        success: true,
        data: mockMenuList
      };
    }
  }
] as MockMethod[]; 