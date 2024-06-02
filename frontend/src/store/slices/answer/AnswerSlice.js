import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  tabChange: 0,
  userAnswer: {},
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
    updateAnswer: (state, action) => {
      state.loading = false;
      state.userAnswer = action.payload;
      state.success = true;
    },
  },
});

export const { clearState, updateAnswer } = answerSlice.actions;

export default answerSlice.reducer;
