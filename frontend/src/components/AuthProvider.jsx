import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from '../store/slices/auth/AuthActions';
import { logOut } from '../store/slices/auth/AuthSlice';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { authToken, refreshToken: storedRefreshToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkTokenValidity = async () => {
      // If we have tokens but no valid auth token, try to refresh
      if (storedRefreshToken && !authToken) {
        try {
          await dispatch(refreshToken()).unwrap();
        } catch (error) {
          // Refresh failed, logout user
          dispatch(logOut());
        }
      }
    };

    checkTokenValidity();
  }, [dispatch, authToken, storedRefreshToken]);

  return <>{children}</>;
};

export default AuthProvider; 
 