import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/AuthSlice';
import questionReducer from "./slices/question/QuestionSlice"
import profileReducer from "./slices/profile/ProfileSlice"
import { createLogger } from 'redux-logger'

const logger = createLogger()

export const store = configureStore({
  reducer: {
    auth: authReducer,
    question: questionReducer,
    profile: profileReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});



