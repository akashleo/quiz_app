import { createSlice } from "@reduxjs/toolkit";
import { login, adminRegister, adminApproved, adminRejected, refreshToken, sendOtp, verifyOtp } from "./AuthActions";

const authToken = localStorage.getItem("authToken")
  ? localStorage.getItem("authToken")
  : null;
const refreshTokenStored = localStorage.getItem("refreshToken")
  ? localStorage.getItem("refreshToken")
  : null;
const currentUserId = localStorage.getItem("authId")
  ? localStorage.getItem("authId")
  : null;

const initialState = {
  loading: false,
  authToken,
  refreshToken: refreshTokenStored,
  error: null,
  responseData: null,
  success: false,
  userInfo: null,
  currentUserId: currentUserId,
  tokenValidity: authToken ? true : false,
  // OTP related state
  otpLoading: false,
  otpSent: false,
  otpVerified: false,
  otpError: null,
};

const authSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("authId");
      state.loading = false;
      state.authToken = null;
      state.refreshToken = null;
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
    clearOtpState: (state) => {
      state.otpLoading = false;
      state.otpSent = false;
      state.otpVerified = false;
      state.otpError = null;
    },
    isTokenValid: (state, action) => {
      state.tokenValidity = action.payload;
    },
    setResponsedata: (state, action) => {
      state.responseData = action.payload;
    },
    setToken: (state, action) => {
      state.authToken = action.payload;
      state.tokenValidity = true;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.currentUserId = action.payload._id;
      state.success = true;
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
      state.refreshToken = action.payload.refreshToken;
      state.currentUserId = action.payload.user._id;
      state.userInfo = action.payload.user;
      state.tokenValidity = true;
      state.success = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.responseData = "Invalid User";
      state.success = false;
    });
    builder.addCase(refreshToken.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.loading = false;
      state.authToken = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.tokenValidity = true;
      state.error = null;
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.authToken = null;
      state.refreshToken = null;
      state.tokenValidity = false;
      state.currentUserId = null;
      state.userInfo = null;
    });
    builder.addCase(adminRegister.pending, (state, payload) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(adminRegister.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.currentUserId = action.payload.user._id;
      state.userInfo = action.payload.user;
    });
    builder.addCase(adminRegister.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(adminApproved.pending, (state, payload) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(adminApproved.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.currentUserId = action.payload.user._id;
      state.userInfo = action.payload.user;
    });
    builder.addCase(adminApproved.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(adminRejected.pending, (state, payload) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(adminRejected.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.currentUserId = action.payload.user._id;
      state.userInfo = action.payload.user;
    });
    builder.addCase(adminRejected.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    // OTP extraReducers
    builder.addCase(sendOtp.pending, (state) => {
      state.otpLoading = true;
      state.otpError = null;
      state.otpSent = false;
    });
    builder.addCase(sendOtp.fulfilled, (state, action) => {
      state.otpLoading = false;
      state.otpSent = true;
      state.otpError = null;
    });
    builder.addCase(sendOtp.rejected, (state, action) => {
      state.otpLoading = false;
      state.otpError = action.payload;
      state.otpSent = false;
    });
    builder.addCase(verifyOtp.pending, (state) => {
      state.otpLoading = true;
      state.otpError = null;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.otpLoading = false;
      state.otpVerified = true;
      state.otpError = null;
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.otpLoading = false;
      state.otpError = action.payload;
      state.otpVerified = false;
    });
  },
});

export const { 
  logOut, 
  clearState, 
  clearOtpState,
  isTokenValid, 
  setResponsedata,
  setToken,
  setRefreshToken,
  setUser
} = authSlice.actions;

export default authSlice.reducer;
