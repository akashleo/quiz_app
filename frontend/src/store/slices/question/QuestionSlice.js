import { createSlice } from "@reduxjs/toolkit";
import {
  getAllQuestions,
  addQuestion,
  updateQuestion,
  getAllArchivedQuestions,
  deleteQuestion,
  bulkLoadQuestions,
  fetchQuestionById,
} from "./QuestionAction";

const initialState = {
  loading: false,
  error: null,
  questions: [],
  singleQuestion: {},
  displayQuestion: {},
  archivedQuestions: [],
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
      state.singleQuestion = {};
      state.displayQuestion = {};
      state.archivedQuestions = [];
    },
    setDisplayQuestion: (state, action) => {
      state.displayQuestion = state.questions[action.payload];
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
      const modifyQuestions = action.payload.map((question) => {
        return {
          ...question,
          correct: question.options[question.isCorrect - 1].text,
        };
      });
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
      //state.questions = action.payload.questions
      const modifyQuestions = action?.payload?.map((question) => {
        return {
          ...question,
          correct: question.options[question.isCorrect - 1].text,
        };
      });
      state.questions = modifyQuestions;
      state.success = true;
    });
    builder.addCase(addQuestion.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(updateQuestion.pending, (state, payload) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(updateQuestion.fulfilled, (state, action) => {
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
    builder.addCase(updateQuestion.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(bulkLoadQuestions.pending, (state, payload) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(bulkLoadQuestions.fulfilled, (state, action) => {
      state.loading = false;
      const modifyQuestions = action.payload.questions.map((question) => {
        return {
          ...question,
          correct: question.options[question.isCorrect - 1].text,
        };
      });
      state.questions = modifyQuestions;
      state.success = true;
    });
    builder.addCase(bulkLoadQuestions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(getAllArchivedQuestions.pending, (state, payload) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });

    builder.addCase(getAllArchivedQuestions.fulfilled, (state, action) => {
      state.loading = false;
      const modifyQuestions = action.payload.map((question) => {
        return {
          ...question,
          correct: question.options[question.isCorrect - 1].text,
        };
      });
      state.archivedQuestions = modifyQuestions;
      state.success = true;
    });
    builder.addCase(getAllArchivedQuestions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });

    builder.addCase(deleteQuestion.pending, (state, payload) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      state.loading = false;
      const modifyQuestions = action.payload.questions.map((question) => {
        return {
          ...question,
          correct: question.options[question.isCorrect - 1].text,
        };
      });
      state.questions = modifyQuestions;
      state.success = true;
    });
    builder.addCase(deleteQuestion.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });

    builder.addCase(fetchQuestionById.pending, (state, payload) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(fetchQuestionById.fulfilled, (state, action) => {
      state.loading = false;
      state.displayQuestion = action.payload.question;
      state.success = true;
    });
    builder.addCase(fetchQuestionById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});
export const { clearState, setDisplayQuestion } = questionSlice.actions;

export default questionSlice.reducer;
