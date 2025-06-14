import { createAsyncThunk } from "@reduxjs/toolkit";
import apiConfig from "../../../AxiosConfig";
import { errorHandler } from "../../ErrorHandler";

export const createNewAnswer = createAsyncThunk(
  "createNewAnswer",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.post("answer", body);
      if (data) {
        return data;
      } else {
        return rejectWithValue("Failed to create answer");
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);

export const updateAnswer = createAsyncThunk(
  "updateAnswer",
  async (req, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.put(`answer/${req.id}`, req.body);
      if (data) {
        return data;
      } else {
        return rejectWithValue("Failed to update answer");
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);

export const submitAnswer = createAsyncThunk(
  "submitAnswer",
  async (req, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.put(`answer/submit/${req.id}`, req.body);
      if (data) {
        return data;
      } else {
        return rejectWithValue("Failed to submit answer");
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);

export const getReviewedAnswers = createAsyncThunk(
  "getReviewedAnswers",
  async (profileId, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.get(`answer/${profileId}`);
      if (data) {
        return data;
      } else {
        return rejectWithValue("Failed to fetch reviewed answers");
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);
