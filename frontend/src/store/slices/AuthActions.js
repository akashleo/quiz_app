import { createAsyncThunk } from '@reduxjs/toolkit';
import apiConfig from "../../AxiosConfig";
import { errorHandler } from '../ErrorHandler';

export const login = createAsyncThunk('user/login',
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await apiConfig.post(
        'user/login',
        body
      )
      localStorage.setItem('authToken', data?.token);
      localStorage.setItem('authId', data?.user._id);
      const resMsgType = data.message
      const resMsg = data.message ? 'Login succesful'
        : '';
      if (resMsgType == 'Login Successful') {
        return data;
      } else if (resMsgType == 'error') {
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

export const register = createAsyncThunk('admin/register',
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.post(
        'admin/register',
        body
      )
      const resMsgType = data.status.success === true ? 'success'
        : 'error';
      const resMsg = data.result ? 'The user has been added.'
        : data.error ? data.status.message
          : '';
      if (resMsgType == 'success') {
        return data.result;
      } else if (resMsgType == 'error') {
        return rejectWithValue(resMsg);
      }
    } catch (error) {
      //console.clear()
      return rejectWithValue(errorHandler(error,dispatch));
    }
  }
)
