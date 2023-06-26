import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/AuthSlice';
import questionReducer from "./slices/question/QuestionSlice"
import profileReducer from "./slices/profile/ProfileSlice"
import topicReducer from "./slices/topic/TopicSlice"
import fileReducer from "./slices/file/FileSlice";
import { createLogger } from 'redux-logger'

const logger = createLogger()

export const store = configureStore({
  reducer: {
    auth: authReducer,
    question: questionReducer,
    profile: profileReducer,
    topic: topicReducer,
    file: fileReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});



