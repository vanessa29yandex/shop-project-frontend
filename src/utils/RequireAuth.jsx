import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const RequireAuth = () => {
    const { user } = useContext(AuthContext);
  
  return user?.user?<Outlet/> : <Navigate to='/' replace/>;
};

export default RequireAuth