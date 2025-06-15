import { Dropdown, Layout } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar from './components/AppSideBar';
import toast from 'react-hot-toast';
import { FaUserCog } from 'react-icons/fa';
import { FiDelete, FiLogOut, FiSettings } from 'react-icons/fi';
import Search from 'antd/es/transfer/search';

const { Header, Content } = Layout;


const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = (e) => {
    toast.success('Click on menu item.');
    console.log('click', e);
  };

  const onSearch = (value, _e, info) => console.log(info?.source, value);
  
  const items = [
    {
      label: 'Logout',
      key: '1',
      icon: <FiLogOut />,
    },
    {
      label: 'Settings',
      key: '2',
      icon: <FiSettings />,
    },
    {
      label: 'Delete account',
      key: '3',
      icon: <FiDelete />,
      danger: true,
    },
  ];
  
  
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <Layout className="min-h-[100vh] ">
      <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <Layout >
        <Header className="bg-white shadow-sm flex items-center  h-16 ">
          <div className="w-full flex justify-between items-center">
            <Search placeholder="input search text" onSearch={onSearch} enterButton  size='large' />

            
            
            <Dropdown.Button menu={menuProps} size='large' className='flex! justify-end!' placement="bottom" icon={<FaUserCog />}>
              Azamat Pulatov
            </Dropdown.Button>

          </div>
        </Header>

        <Content className="px-10 bg-gray-800 min-h-[calc(100vh-64px)]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
