import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children, allowedRoles = [], requireAuth = true }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If specific roles are required
  if (allowedRoles.length > 0 && isAuthenticated) {
    if (!user || !allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on user role
      const redirectPath = getDashboardPath(user?.role);
      return <Navigate to={redirectPath} replace />;
    }
  }

  // If user is authenticated but trying to access auth pages
  if (isAuthenticated && ['/login', '/register'].includes(location.pathname)) {
    const redirectPath = getDashboardPath(user?.role);
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

// Helper function to get dashboard path based on user role
const getDashboardPath = (role) => {
  switch (role) {
    case 'admin':
      return '/admin-dashboard';
    case 'donor':
      return '/donor-dashboard';
    case 'needy':
      return '/needy-dashboard';
    default:
      return '/';
  }
};

export default ProtectedRoute;
