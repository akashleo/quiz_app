import { createAsyncThunk } from "@reduxjs/toolkit";
//import apiConfig from "../../../AxiosConfig";
import { errorHandler } from "../../ErrorHandler";
import axios from 'axios';

const fileUploadConfig = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${localStorage.getItem("authToken")}`
  }
});


export const fileUpload = createAsyncThunk(
  "upload",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fileUploadConfig.post("/upload", formData);
      const { data } = response;
      const resMsgType = data.message;
      const resMsg = data.message;
      if (resMsgType === "error") {
        return rejectWithValue(resMsg);
      } else {
        return response.data;
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
