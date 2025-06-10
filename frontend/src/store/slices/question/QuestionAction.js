import { createAsyncThunk } from "@reduxjs/toolkit";
import apiConfig from "../../../AxiosConfig";
import { errorHandler } from "../../ErrorHandler";

export const addQuestion = createAsyncThunk(
  "addQuestions",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.post("questions", body);
      if (data) {
        return data;
      } else {
        return rejectWithValue("Failed to add question");
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);

export const updateQuestion = createAsyncThunk(
  "updateQuestion",
  async (req, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.put(`questions/${req.id}`, req.body);
      if (data) {
        return data;
      } else {
        return rejectWithValue("Failed to update question");
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);

export const fetchQuestionById = createAsyncThunk(
  "questions/fetchById",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await apiConfig.get(`/questions/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  "deleteQuestion", 
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.delete(`questions/${id}`);
      if (data) {
        return data;
      } else {
        return rejectWithValue("Failed to delete question");
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);

export const getAllQuestions = createAsyncThunk(
  "getQuestions",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.get("questions", body);
      if (data) {
        return data.questions;
      } else {
        return rejectWithValue("Failed to fetch questions");
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);

export const getAllArchivedQuestions = createAsyncThunk(
  "getArchivedQuestions",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.get("questions/archived", body);
      if (data) {
        return data.questions;
      } else {
        return rejectWithValue("Failed to fetch archived questions");
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);

export const bulkLoadQuestions = createAsyncThunk(
  "bulkLoadQuestions",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.post("questions/bulk", body);
      if (data) {
        return data;
      } else {
        return rejectWithValue("Failed to bulk load questions");
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);
