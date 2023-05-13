import { createAsyncThunk } from '@reduxjs/toolkit';
import apiConfig from "../../../AxiosConfig";
import { errorHandler } from '../../ErrorHandler';

export const addQuestion = createAsyncThunk('addQuestions',
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await apiConfig.post(
        'questions',
        body
      )
      const resMsg= "error"
      if (data) {
        return data;
      } else {
        return rejectWithValue(resMsg);
      }
    } catch (error) {
      //console.clear()
      const statusCode = error.response.data.error.status;
      if (statusCode == 412) {
        return rejectWithValue(error.response.data.error['validationErrors'][0].msg)
      } else {
        return rejectWithValue(error.response.data.error.msg);
      }
    }
  }
)

export const getAllQuestions = createAsyncThunk('getQuestions',
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.get(
        'questions',
        body
      )
      const resMsg= "error"
      if (data) {
        return data.questions;
      } else {
        return rejectWithValue(resMsg);
      }
    } catch (error) {
      //console.clear()
      return rejectWithValue(errorHandler(error,dispatch));
    }
  }
)
