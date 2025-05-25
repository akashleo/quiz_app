import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import authReducer from '../store/slices/auth/AuthSlice';
import topicReducer from '../store/slices/topic/TopicSlice';
import questionReducer from '../store/slices/question/QuestionSlice';
import profileReducer from '../store/slices/profile/ProfileSlice';
import answerReducer from '../store/slices/answer/AnswerSlice';
import fileReducer from '../store/slices/file/FileSlice';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        auth: authReducer,
        topic: topicReducer,
        question: questionReducer,
        profile: profileReducer,
        answer: answerReducer,
        file: fileReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };

// Mock data
export const mockUser = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
};

export const mockTopic = {
  id: '1',
  title: 'Test Topic',
  description: 'Test Description',
  questions: [],
};

export const mockQuestion = {
  id: '1',
  text: 'Test Question',
  options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  correctAnswer: 0,
  topicId: '1',
};

export const mockProfile = {
  id: '1',
  userId: '1',
  name: 'Test Profile',
  bio: 'Test Bio',
};

export const mockAnswer = {
  id: '1',
  questionId: '1',
  userId: '1',
  selectedOption: 0,
}; 