import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminRoute = () => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return null;

  return isAuthenticated && user?.role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to={isAuthenticated ? '/dashboard' : '/login'} />
  );
};

export default AdminRoute;
