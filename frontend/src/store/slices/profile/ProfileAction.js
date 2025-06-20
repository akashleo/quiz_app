import { createAsyncThunk } from '@reduxjs/toolkit';
import apiConfig from "../../../AxiosConfig";
import { errorHandler } from '../../ErrorHandler';

export const addProfile = createAsyncThunk('addProfiles',
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await apiConfig.post(
        'profiles',
        body
      );
      const resMsg = "error";
      if (data) {
        return data;
      } else {
        return rejectWithValue(resMsg);
      }
    } catch (error) {
      const statusCode = error.response.data.error.status;
      if (statusCode === 412) {
        return rejectWithValue(error.response.data.error['validationErrors'][0].msg);
      } else {
        return rejectWithValue(error.response.data.error.msg);
      }
    }
  }
);

export const getAllProfiles = createAsyncThunk('getProfiles',
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.get(
        'profiles',
        body
      );
      const resMsg = "error";
      if (data) {
        return data.profiles;
      } else {
        return rejectWithValue(resMsg);
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);

export const getAllProfilesAdmin = createAsyncThunk('getProfilesAdmin',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.get('profiles');
      if (data?.profiles) {
        return data.profiles;
      } else {
        return rejectWithValue("No profiles found");
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);

export const getPendingAdminRequests = createAsyncThunk('getPendingAdminRequests',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.get('profiles/admin/pending-requests');
      if (data?.pendingRequests) {
        return {
          pendingRequests: data.pendingRequests,
          count: data.count,
          message: data.message
        };
      } else {
        return rejectWithValue("No pending requests found");
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);

export const getProfileById = createAsyncThunk('getProfileById',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await apiConfig.get(
        `profiles/${id}`
      );
      const resMsg = "error";
      if (data) {
        return data.profile;
      } else {
        return rejectWithValue(resMsg);
      }
    } catch (error) {
      return rejectWithValue(errorHandler(error, dispatch));
    }
  }
);

export const updateProfile = createAsyncThunk('updateProfiles',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await apiConfig.put(
        `profiles/${payload.id}`,
        payload.body
      );
      const resMsg = "error";
      if (data) {
        return data;
      } else {
        return rejectWithValue(resMsg);
      }
    } catch (error) {
      const statusCode = error.response.data.error.status;
      if (statusCode === 412) {
        return rejectWithValue(error.response.data.error['validationErrors'][0].msg);
      } else {
        return rejectWithValue(error.response.data.error.msg);
      }
    }
  }
);
