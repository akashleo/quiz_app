import { createSlice } from "@reduxjs/toolkit";
// import {
//   getAllQuestions,
//   addQuestion,
//   updateQuestion,
//   getAllArchivedQuestions,
//   deleteQuestion,
// } from "./QuestionAction";

const QUIZ_NOT_STARTED = "QUIZ_NOT_STARTED";
const QUIZ_STARTED = "QUIZ_STARTED";
const TOPIC_SELECTED = "TOPIC_SELECTED";
const TIMER_START = "TIMER_START";
const TIMER_END = "TIMER_END"; 

const initialState = {
  loading: false,
  error: null,
  success: false,
  selectedTopic: null,
  questionsList: [],
  progressMeasure: QUIZ_NOT_STARTED
};

const answerSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.selectedTopic= null;
      state.questionsList= [];
      state.progressMeasure= QUIZ_NOT_STARTED;
    },
    quizStart: (state, action) => {
        state.progressMeasure = QUIZ_STARTED;
      },

    setSelectedTopic: (state, action) => {
      state.selectedTopic = state.questions[action.payload];
      state.progressMeasure = TOPIC_SELECTED;
    }
  },
//   extraReducers: (builder) => {
  
//   },
});
export const { clearState, setSelectedTopic, quizStart  } = answerSlice.actions;

export default answerSlice.reducer;
