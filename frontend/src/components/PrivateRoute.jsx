import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, requiredRole }) => {
  const { userInfo, tokenValidity } = useSelector((state) => state.auth);

  if (!tokenValidity) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && userInfo?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute; 