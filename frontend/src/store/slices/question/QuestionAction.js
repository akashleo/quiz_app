import { createAsyncThunk } from "@reduxjs/toolkit";
import apiConfig from "../../../AxiosConfig";
import { errorHandler } from "../../ErrorHandler";

export const addQuestion = createAsyncThunk(
  "addQuestions",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await apiConfig.post("questions", body);
      const resMsg = "error";
      if (data) {
        return data;
      } else {
        return rejectWithValue(resMsg);
      }
    } catch (error) {
      //console.clear()
      const statusCode = error.response.data.error.status;
      if (statusCode === 412) {
        return rejectWithValue(
          error.response.data.error["validationErrors"][0].msg
        );
      } else {
        return rejectWithValue(error.response.data.error.msg);
      }
    }
  }
);

export const updateQuestion = createAsyncThunk(
  "updateQuestion",
  async (req, { dispatch }) => {
    try {
      const { data } = await apiConfig.put(`questions/${req.id}`, req.body);
      if (data) {
        return data;
      } else {
        return "Error on response";
      }
    } catch (error) {
      return "Error on catch";
    }
  }
);

export const fetchQuestionById = createAsyncThunk(
  "questions/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiConfig.get(`/questions/${id}`);
      return response.data;
    } catch (error) {
      // Check if the error response has a data property
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        // Return a generic error message
        return rejectWithValue({
          message: "An error occurred while fetching the question.",
        });
      }
    }
  }
);

export const deleteQuestion = createAsyncThunk("deleteQuestion", async (id) => {
  try {
    const { data } = await apiConfig.delete(`questions/${id}`);
    if (data) {
      return data;
    } else {
      return "Error on response";
    }
  } catch (error) {
    return "Error on catch";
  }
});

export const getAllQuestions = createAsyncThunk(
  "getQuestions",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.get("questions", body);
      const resMsg = "error";
      if (data) {
        return data.questions;
      } else {
        return rejectWithValue(resMsg);
      }
    } catch (error) {
      //console.clear()
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);

export const getAllArchivedQuestions = createAsyncThunk(
  "getArchivedQuestions",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.get("questions/archived", body);
      const resMsg = "error";
      if (data) {
        return data.questions;
      } else {
        return rejectWithValue(resMsg);
      }
    } catch (error) {
      //console.clear()
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);

export const bulkLoadQuestions = createAsyncThunk(
  "bulkLoadQuestions",
  async (body) => {
    try {
      const { data } = await apiConfig.post("questions/bulk", body);
      if (data) {
        return data;
      } else {
        return "error";
      }
    } catch (error) {
      return "error";
    }
  }
);
