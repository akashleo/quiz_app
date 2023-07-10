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
      if (statusCode === 412) {
        return rejectWithValue(error.response.data.error['validationErrors'][0].msg)
      } else {
        return rejectWithValue(error.response.data.error.msg);
      }
    }
  }
)


export const updateQuestion = createAsyncThunk('updateQuestion',
  async (req , {dispatch}) => { 
    console.log("bodyyyy", req.body)
    try {
      const { data } = await apiConfig.put(
        `questions/${req.id}`,
        req.body
      )
      if (data) {
        window.location.reload(false);
        return data;
      } else {
        return "Error on response";
      }
    } catch (error) {

        return "Error on catch";
     
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

export const getAllArchivedQuestions = createAsyncThunk('getArchivedQuestions',
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.get(
        'questions/archived',
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

