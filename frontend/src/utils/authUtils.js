import { store } from '../store/store';
import { logOut } from '../store/slices/auth/AuthSlice';

export const handleTokenExpiration = () => {
  // Clear all auth-related data
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("authId");
  
  // Dispatch logout action
  store.dispatch(logOut());
  
  // Redirect to login
  window.location.href = '/';
};

export const isTokenExpired = (error) => {
  return error.response?.status === 401 && 
         error.response?.data?.error === 'TOKEN_EXPIRED';
};

export const hasRefreshToken = () => {
  return !!localStorage.getItem("refreshToken");
}; 
 