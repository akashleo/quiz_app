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

export const sendOtp = createAsyncThunk(
  "user/sendOtp",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.post("user/verify/send-otp", body);

      if (data?.message) {
        return data;
      } else {
        return rejectWithValue(data?.message || "Failed to send OTP");
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.post("user/verify/validate-otp", body);

      if (data?.message) {
        return data;
      } else {
        return rejectWithValue(data?.message || "Failed to verify OTP");
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);

export const adminRegister = createAsyncThunk(
  "user/adminRegister",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.post("user/admin/request", body);

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

export const adminApproved = createAsyncThunk(
  "user/adminApproved",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.post("user/admin/approved", body);

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

export const adminRejected = createAsyncThunk(
  "user/adminRejected",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.post("user/admin/rejected", body);

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
