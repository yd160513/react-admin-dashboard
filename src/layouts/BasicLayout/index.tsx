import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';
import { UserInfo } from '@/types/user';
import { getRandomColor } from '@/utils/color';
import { fetchMenuList } from '@/services/api/menu';
import { MenuType } from '@/types/menu';
import styles from './index.module.scss';

const { Header, Sider, Content } = Layout;

// 图标映射表
const iconMap: Record<string, React.ReactNode> = {
  UserList: <UserOutlined />,
  DepartmentList: <TeamOutlined />,
  LogList: <FileTextOutlined />,
  SystemManagement: <SettingOutlined />,
};

interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: string;
  children?: MenuItem[];
  onClick?: () => void;
}

const BasicLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const navigate = useNavigate();
  const userInfo: UserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  // 转换菜单数据格式
  const transformMenuItems = (menuList: MenuType[]): MenuItem[] => {
    return menuList.map(menu => ({
      key: menu.path,
      icon: iconMap[menu.element],
      label: menu.meta?.title || '',
      children: menu.children ? transformMenuItems(menu.children) : undefined,
      onClick: () => navigate(menu.path)
    }));
  };

  // 获取菜单数据
  useEffect(() => {
    const getMenuData = async () => {
      const menuList = await fetchMenuList();
      const items = [
        {
          key: 'welcome',
          label: '欢迎',
          onClick: () => navigate('/welcome'),
        },
        ...transformMenuItems(menuList)
      ];
      setMenuItems(items);
    };

    getMenuData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const userMenuItems = [
    {
      key: 'logout',
      label: '登出',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    }
  ];

  // 获取用户名首字母作为头像
  const getAvatarText = (username: string) => {
    return username ? username.charAt(0).toUpperCase() : 'U';
  };

  return (
    <Layout className={styles.layout}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logo}>
          {!collapsed ? 'React Admin' : 'RA'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['welcome']}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className={styles.trigger}
          />
          <div className={styles.rightContent}>
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              arrow
            >
              <Avatar
                style={{ 
                  backgroundColor: getRandomColor(userInfo.username),
                  cursor: 'pointer'
                }}
              >
                {getAvatarText(userInfo.username)}
              </Avatar>
            </Dropdown>
          </div>
        </Header>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout; 