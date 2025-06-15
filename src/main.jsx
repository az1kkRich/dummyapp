import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './components/auth/authLayout.jsx'
import Login from './components/auth/Login.jsx'
import Register from './components/auth/Register.jsx'
import ProtectedRoutes from './routes/ProtectedRoutes.jsx'
import { ConfigProvider, theme } from 'antd'
import Home from './pages/Home.jsx'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <AuthLayout/>,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }      
    ]
  },
  {
    path: '/',
    element: <App />,  // Bu layout bo‘lib xizmat qiladi
    children: [
      { index: true, element: <Home /> }, // root sahifa
      { path: 'posts', element: <div>All Posts</div> },
      { path: 'todos', element: <div>All Todos</div> },
      { path: 'profile', element: <div>Your Profile</div> },
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm, }}>
      <RouterProvider router={router} />

    </ConfigProvider>
  </StrictMode>,
)
