import { Dropdown, Layout } from 'antd';
import { useLayoutEffect, useState } from 'react';
import { Outlet,  useNavigate } from 'react-router-dom';
import AppSidebar from './components/AppSideBar';
import toast from 'react-hot-toast';
import { FaUserCog } from 'react-icons/fa';
import { FiDelete, FiLogOut, FiSettings } from 'react-icons/fi';
import Search from 'antd/es/transfer/search';
import { useQuery } from '@tanstack/react-query';
import { getMe } from './api/api';

const { Header, Content } = Layout;


const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate()

  const handleMenuClick = (e) => {
    if (e.key == '1') {
      localStorage.removeItem("user")
      navigate("/login")
    }
  };

  
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

  const {data, isLoading, error} = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });
  
  useLayoutEffect(() => {
    const width = window.innerWidth;
    if (width < 768) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    } 
  })

  return (
    <Layout className="min-h-[100vh] ">

      <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <Layout >
        <Header className="bg-white shadow-sm flex items-center  h-16 ">
          <div className="w-full flex justify-between items-center">
            <div className='md:flex gap-2 hidden '>
              {
                isLoading ? <span>Loading...</span> : error ? <span className='text-red-500'>Error fetching user data</span> : <div className='flex gap-3'>
                    <img src={data.image} className='w-10 h-10 border' alt="" />
                    <div className='flex flex-col'>
                      <span className='text-lg font-semibold '>{data.role}</span>
                      <span className='text-sm text-gray-500 mt-[-8px]'>{data.email}</span>
                    </div>
                </div> 
              }
            </div>
            
            
            <Dropdown.Button menu={menuProps} size='large' className='flex! justify-end!' placement="bottom" icon={<FaUserCog />}>
              {isLoading ? 'Loading...' : error ? 'Error' : data?.username || `${data.username}`}
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
