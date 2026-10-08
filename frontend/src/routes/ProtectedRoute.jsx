import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function ProtectedRoute() {
  const { isAuthenticated } = useStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
