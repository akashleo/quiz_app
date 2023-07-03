import { createSlice } from "@reduxjs/toolkit";
import { getAllQuestions, addQuestion } from "./QuestionAction";


const initialState = {
  loading: false,
  error: null,
  questions: [],
  singleQuestion: {},
  success: false,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllQuestions.pending, (state, payload) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getAllQuestions.fulfilled, (state, action) => {
      state.loading = false;
      const modifyQuestions = action.payload.map((question)=>{
        return {...question, "correct": question.options[question.isCorrect-1].text}
      })
      state.questions = modifyQuestions;
      state.success = true;
    });
    builder.addCase(getAllQuestions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(addQuestion.pending, (state, payload) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(addQuestion.fulfilled, (state, action) => {
      state.loading = false;
      state.singleQuestion = action.payload
      state.success = true;
    });
    builder.addCase(addQuestion.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});
export const { logOut, clearState, isTokenValid } = questionSlice.actions;

export default questionSlice.reducer;
