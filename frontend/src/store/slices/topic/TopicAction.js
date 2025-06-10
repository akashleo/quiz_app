import { createAsyncThunk } from "@reduxjs/toolkit";
import apiConfig from "../../../AxiosConfig";
import { errorHandler } from "../../ErrorHandler";

export const addTopic = createAsyncThunk(
  "addTopics",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.post("topics", body);
      if (data) {
        return data;
      } else {
        return rejectWithValue("Failed to add topic");
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);

export const getAllTopics = createAsyncThunk(
  "getTopics",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.get("topics", body);
      if (data) {
        return data.topics;
      } else {
        return rejectWithValue("Failed to fetch topics");
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);

export const deleteTopic = createAsyncThunk(
  "deleteTopics",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.delete(`topics/${id}`);
      if (data) {
        return data.topics;
      } else {
        return rejectWithValue("Failed to delete topic");
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);

export const updateTopic = createAsyncThunk(
  "updateTopic",
  async (req, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.put(`topics/${req.id}`, req.body);
      if (data) {
        return data;
      } else {
        return rejectWithValue("Failed to update topic");
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);
