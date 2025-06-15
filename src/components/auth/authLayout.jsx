import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='container flex justify-center items-center h-[100vh] bg-green-700 '>
      <Outlet />
    </div>
  )
}

export default AuthLayout
