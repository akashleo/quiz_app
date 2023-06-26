import { createAsyncThunk } from "@reduxjs/toolkit";
import apiConfig from "../../../AxiosConfig";
import { errorHandler } from "../../ErrorHandler";

export const fileUpload = createAsyncThunk(
  "upload",
  async (formData, { rejectWithValue }) => {
    console.log(formData)
    try {
      const response = await apiConfig.get("/upload", formData);
      const { data } = response;
      const resMsgType = data.message;
      const resMsg = data.message;
      if (resMsgType == "error") {
        return rejectWithValue(resMsg);
      } else {
        return response.data;
      }
    } catch (error) {
      const statusCode = error.response.data.error.status;
      if (statusCode == 412) {
        return rejectWithValue(
          error.response.data.error["validationErrors"][0].msg
        );
      } else {
        return rejectWithValue(error.response.data.error.msg);
      }
    }
  }
);
