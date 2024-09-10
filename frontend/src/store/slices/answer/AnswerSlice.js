import { createSlice } from "@reduxjs/toolkit";
import { createNewAnswer, updateAnswer } from "./AnswerAction";

const initialState = {
  loading: false,
  error: null,
  tabChange: 0,
  currentUserAnswer: {},
  userAllAnswers: [],
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
      state.currentUserAnswer = action.payload.answer;
      state.success = true;
    });
    builder.addCase(updateAnswer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});

export const { clearState } = answerSlice.actions;

export default answerSlice.reducer;
