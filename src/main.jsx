import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './components/auth/Login.jsx'
import ProtectedRoutes from './routes/ProtectedRoutes.jsx'
import { ConfigProvider, theme } from 'antd'
import Home from './pages/Home.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Post from './pages/Post.jsx'
import PostDetail from './components/main/PostDetail.jsx'
import Todos from './pages/Todos.jsx'
import Profile from './pages/Profile.jsx'
import Product from './pages/Products.jsx'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login/>,
    
  },
  {
    path: '/',
    element: <ProtectedRoutes />,  // Bu layout bo‘lib xizmat qiladi
    children: [
      { path: "/",
        element: <App />, 
        children:[
          { index: true, element: <Home /> },
          { path: 'posts', element: <Post /> },
          { path: 'posts/:id', element: <PostDetail /> },
          { path: 'todos', element: <Todos /> },
          { path: 'products', element: <Product /> },
          { path: 'profile', element: <Profile /> },  
        ]
      },
      ,
    ]
  }
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm, }}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>,
)
