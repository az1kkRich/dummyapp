import React from 'react'
import { Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default ProtectedRoutes
