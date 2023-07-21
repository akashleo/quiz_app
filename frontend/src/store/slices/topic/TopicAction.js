import { createAsyncThunk } from "@reduxjs/toolkit";
import apiConfig from "../../../AxiosConfig";
import { errorHandler } from "../../ErrorHandler";

export const addTopic = createAsyncThunk(
  "addTopics",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await apiConfig.post("topics", body);
      const resMsg = "error";
      if (data) {
        return data;
      } else {
        return rejectWithValue(resMsg);
      }
    } catch (error) {
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

export const getAllTopics = createAsyncThunk(
  "getTopics",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.get("topics", body);
      const resMsg = "error";
      if (data) {
        return data.topics;
      } else {
        return rejectWithValue(resMsg);
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);

export const deleteTopic = createAsyncThunk(
  "deleteTopics",
  async (id, { rejectWithValue }) => {
    try {
      const {data} = await apiConfig.delete(`topics/${id}`);
      const resMsg = "error";
      if (data) {
        return data.topics;
      } else {
        return rejectWithValue(resMsg);
      }
    } catch (error) {
      return rejectWithValue(error.response.data.error.msg);
    }
  }
);
