import { createSlice } from "@reduxjs/toolkit";
import { createNewAnswer, updateAnswer, submitAnswer } from "./AnswerAction";

const initialState = {
  loading: false,
  error: null,
  tabChange: 0,
  currentUserAnswer: {},
  userAllAnswers: [],
  answerMap: {},
  success: false,
};

const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    updateAnswerMap: (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.answerMap = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewAnswer.pending, (state, payload) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(createNewAnswer.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUserAnswer = action.payload.answer;
      state.success = true;
    });
    builder.addCase(createNewAnswer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });

    builder.addCase(updateAnswer.pending, (state, payload) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(updateAnswer.fulfilled, (state, action) => {
      state.loading = false;
      //const answerList = action.payload.answer;
      state.currentUserAnswer = action.payload.answer;
      state.success = true;
    });
    builder.addCase(updateAnswer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });

    builder.addCase(submitAnswer.pending, (state, payload) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(submitAnswer.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUserAnswer = {};
      state.answerMap = {};
      state.success = true;
    });
    builder.addCase(submitAnswer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});

export const { clearState, updateAnswerMap } = answerSlice.actions;

export default answerSlice.reducer;
