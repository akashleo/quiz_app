import { createAsyncThunk } from "@reduxjs/toolkit";
import apiConfig from "../../../AxiosConfig";

export const createNewAnswer = createAsyncThunk(
  "createNewAnswer",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await apiConfig.post("answer", body);
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

export const updateAnswer = createAsyncThunk(
  "updateAnswer",
  async (req, { dispatch }) => {
    try {
      const { data } = await apiConfig.put(`answer/${req.id}`, req.body);
      if (data) {
        return data;
      } else {
        return "Error on response";
      }
    } catch (error) {
      const statusCode = error.response.data.error.status;
      if (statusCode === 412) {
        return "Error on response";
      } else {
        return "Error on response";
      }
    }
  }
);

export const submitAnswer = createAsyncThunk(
  "submitAnswer",
  async (req, { dispatch }) => {
    try {
      const { data } = await apiConfig.put(`answer/submit/${req.id}`, req.body);
      if (data) {
        return data;
      } else {
        return "Error on response";
      }
    } catch (error) {
      const statusCode = error.response.data.error.status;
      if (statusCode === 412) {
        return "Error on response";
      } else {
        return "Error on response";
      }
    }
  }
);
