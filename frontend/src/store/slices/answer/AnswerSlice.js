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
      const modifyQuestions = action.payload.map((question) => {
        return {
          ...question,
          correct: question.options[question.isCorrect - 1].text,
        };
      });
      state.questions = modifyQuestions;
      state.success = true;
    });
    builder.addCase(createNewAnswer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});

export const { clearState } = answerSlice.actions;

export default answerSlice.reducer;
