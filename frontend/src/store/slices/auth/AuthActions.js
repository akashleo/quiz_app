import { createAsyncThunk } from "@reduxjs/toolkit";
import apiConfig from "../../../AxiosConfig";
import { errorHandler } from "../../ErrorHandler";

export const login = createAsyncThunk(
  "user/login",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.post("user/login", body);
      localStorage.setItem("authToken", data?.token);
      localStorage.setItem("refreshToken", data?.refreshToken);
      localStorage.setItem("authId", data?.user._id);
      if (data?.status === 200) {
        return data;
      } else {
        return rejectWithValue(data?.message);
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);

export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        return rejectWithValue("No refresh token available");
      }

      const { data } = await apiConfig.post("user/refresh-token", {
        refreshToken: refreshToken
      });

      localStorage.setItem("authToken", data?.token);
      localStorage.setItem("refreshToken", data?.refreshToken);
      
      return data;
    } catch (error) {
      // Clear tokens on refresh failure
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("authId");
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.post("user/signup", body);

      if (data?.status === 200) {
        return data;
      } else {
        return rejectWithValue(data?.message);
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);
