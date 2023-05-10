import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/AuthSlice';
import { createLogger } from 'redux-logger'

const logger = createLogger()

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});



