import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/AuthSlice';
import questionReducer from "./slices/question/QuestionSlice"
import { createLogger } from 'redux-logger'

const logger = createLogger()

export const store = configureStore({
  reducer: {
    auth: authReducer,
    question: questionReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});



