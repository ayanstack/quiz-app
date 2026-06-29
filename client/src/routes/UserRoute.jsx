import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const UserRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // or a spinner

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default UserRoute;
