import { createSlice } from "@reduxjs/toolkit";
import { createNewAnswer, updateAnswer, submitAnswer, getReviewedAnswers } from "./AnswerAction";

const initialState = {
  loading: false,
  error: null,
  tabChange: 0,
  currentUserAnswer: {},
  userAllAnswers: [],
  answerMap: {},
  success: false,
  reviewedAnswers: [],
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
    clearReviewedAnswers: (state) => {
      state.reviewedAnswers = [];
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

    builder.addCase(getReviewedAnswers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getReviewedAnswers.fulfilled, (state, action) => {
      state.loading = false;
      state.reviewedAnswers = action.payload.data;
    });
    builder.addCase(getReviewedAnswers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearState, updateAnswerMap, clearReviewedAnswers } = answerSlice.actions;

export default answerSlice.reducer;
