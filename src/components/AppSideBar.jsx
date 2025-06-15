import React from 'react';
import { Layout, Menu } from 'antd';
import {
  AppstoreOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const AppSidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();

  const selectedKey = () => {
    const path = location.pathname;
    if (path.startsWith('/posts')) return '2';
    if (path.startsWith('/todos')) return '3';
    if (path.startsWith('/profile')) return '4';
    return '1';
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={220}
      className="fixed left-0 top-0 bottom-0 z-50 min-h-[100vh]"
    >
      <div className="h-16 flex items-center justify-between px-4 text-white font-bold bg-sky-600">
        <span>{collapsed ? 'DA' : 'DummyApp'}</span>
        <button onClick={() => setCollapsed(!collapsed)} className="text-white">
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>

      <Menu theme="dark" mode="inline" selectedKeys={[selectedKey()]}>
        <Menu.Item key="1" icon={<AppstoreOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UploadOutlined />}>
          <Link to="/posts">Posts</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<CheckCircleOutlined />}>
          <Link to="/todos">Todos</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>
          <Link to="/profile">Profile</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AppSidebar;
