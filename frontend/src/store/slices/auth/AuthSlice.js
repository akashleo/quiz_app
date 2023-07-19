import { createSlice } from "@reduxjs/toolkit";
import { login, signup } from "./AuthActions";

const authToken = localStorage.getItem("authToken")
  ? localStorage.getItem("authToken")
  : null;
const currentUserId = localStorage.getItem("authId")
  ? Number(localStorage.getItem("authId"))
  : null;

const initialState = {
  loading: false,
  authToken,
  error: null,
  responseData: null,
  success: false,
  userInfo: null,
  currentUserId: null,
  tokenValidity: authToken ? true : false,
};

const authSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authId");
      state.loading = false;
      state.authToken = null;
      state.error = null;
      state.responseData = null;
      state.userInfo = null;
      state.success = false;
      state.currentUserId = null;
      state.tokenValidity = false;
    },
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    isTokenValid: (state, action) => {
      state.tokenValidity = action.payload;
    },
    setResponsedata: (state, action) => {
      state.responseData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, payload) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.authToken = action.payload.token;
      state.currentUserId = action.payload.user._id;
      state.userInfo = action.payload.user
      state.tokenValidity = true;
      state.success = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.responseData = "Invalid User"
      state.success = false;
    });
    builder.addCase(signup.pending, (state, payload) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.currentUserId = action.payload.user._id;
      state.userInfo = action.payload.user
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});
export const { logOut, clearState, isTokenValid, setResponsedata } = authSlice.actions;

export default authSlice.reducer;
