import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

const handleTokenExpiration = () => {
  // Clear all auth-related data
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("authId");
  
  // Dispatch logout action if store is available
  if (window.store) {
    window.store.dispatch({ type: 'adminAuth/logOut' });
  }
  
  // Redirect to login
  window.location.href = '/';
};

// Add request interceptor to dynamically add auth token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration and refresh
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (error.response?.data?.error === 'TOKEN_EXPIRED') {
        if (isRefreshing) {
          // If already refreshing, queue this request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return instance(originalRequest);
          }).catch(err => {
            return Promise.reject(err);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = localStorage.getItem("refreshToken");
        
        if (refreshToken) {
          try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}user/refresh-token`, {
              refreshToken: refreshToken
            });

            const { token, refreshToken: newRefreshToken } = response.data;
            
            // Update stored tokens
            localStorage.setItem("authToken", token);
            localStorage.setItem("refreshToken", newRefreshToken);
            
            // Update the authorization header
            instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            originalRequest.headers.Authorization = `Bearer ${token}`;
            
            processQueue(null, token);
            
            return instance(originalRequest);
          } catch (refreshError) {
            processQueue(refreshError, null);
            handleTokenExpiration();
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        } else {
          handleTokenExpiration();
        }
      } else {
        // Other 401 errors (invalid token, etc.)
        handleTokenExpiration();
      }
    }
    
    return Promise.reject(error);
  }
);

export default instance;