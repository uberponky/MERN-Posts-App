import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Navigate, Outlet } from 'react-router-dom'


const GuestRoutes = () => {
  const { user } = useContext(UserContext)
  return !user.email 
  ? <Outlet/> 
  : <Navigate to="/dashboard" replace={true}/>
}

export default GuestRoutes