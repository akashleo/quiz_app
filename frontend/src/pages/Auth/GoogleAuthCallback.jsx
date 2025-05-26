import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setToken, setUser, isTokenValid, setResponsedata } from '../../store/slices/auth/AuthSlice';

const GoogleAuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const userString = params.get('user');

    if (token && userString) {
      try {
        const user = JSON.parse(decodeURIComponent(userString));
        
        // Store the token in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authId', user._id); // Add this line to maintain consistency with your auth flow

        // Dispatch actions to update Redux store
        dispatch(setToken(token));
        dispatch(setUser(user)); 
        dispatch(isTokenValid(true));
        dispatch(setResponsedata('Google Login Successful'));

        // Navigate to the dashboard or desired page
        navigate('/dashboard');
      } catch (error) {
        console.error("Error processing Google auth callback:", error);
        dispatch(setResponsedata('Google Login Failed'));
        navigate('/login');
      }
    } else {
      console.error("Missing token or user data in Google auth callback.");
      dispatch(setResponsedata('Google Login Failed: Missing data'));
      navigate('/login');
    }
  }, [dispatch, navigate, location]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <div className="spinner"></div>
      <p>Processing Google authentication...</p>
    </div>
  );
};

export default GoogleAuthCallback; 