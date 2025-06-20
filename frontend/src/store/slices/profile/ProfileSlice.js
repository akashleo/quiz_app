import { createSlice } from "@reduxjs/toolkit";
import { getAllProfiles, addProfile, getProfileById, getAllProfilesAdmin, getPendingAdminRequests } from "./ProfileAction";

const initialState = {
  loading: false,
  error: null,
  profiles: [],
  singleProfile: {},
  success: false,
  // Admin-specific state
  adminProfilesLoading: false,
  adminProfiles: [],
  adminProfilesError: null,
  // Pending requests state
  pendingRequestsLoading: false,
  pendingRequests: [],
  pendingRequestsError: null,
  pendingRequestsCount: 0,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearAdminState: (state) => {
      state.adminProfilesLoading = false;
      state.adminProfilesError = null;
      state.pendingRequestsLoading = false;
      state.pendingRequestsError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProfiles.pending, (state, payload) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getAllProfiles.fulfilled, (state, action) => {
      state.loading = false;
      state.profiles = action.payload;
      state.success = true;
    });
    builder.addCase(getAllProfiles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(addProfile.pending, (state, payload) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(addProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.singleProfile = action.payload;
      state.success = true;
    });
    builder.addCase(addProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(getProfileById.pending, (state, payload) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getProfileById.fulfilled, (state, action) => {
      state.loading = false;
      state.singleProfile = action.payload;
      state.success = true;
    });
    builder.addCase(getProfileById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    
    // Admin profiles actions
    builder.addCase(getAllProfilesAdmin.pending, (state) => {
      state.adminProfilesLoading = true;
      state.adminProfilesError = null;
    });
    builder.addCase(getAllProfilesAdmin.fulfilled, (state, action) => {
      state.adminProfilesLoading = false;
      state.adminProfiles = action.payload;
      state.adminProfilesError = null;
    });
    builder.addCase(getAllProfilesAdmin.rejected, (state, action) => {
      state.adminProfilesLoading = false;
      state.adminProfilesError = action.payload;
      state.adminProfiles = [];
    });
    
    // Pending admin requests actions
    builder.addCase(getPendingAdminRequests.pending, (state) => {
      state.pendingRequestsLoading = true;
      state.pendingRequestsError = null;
    });
    builder.addCase(getPendingAdminRequests.fulfilled, (state, action) => {
      state.pendingRequestsLoading = false;
      state.pendingRequests = action.payload.pendingRequests;
      state.pendingRequestsCount = action.payload.count;
      state.pendingRequestsError = null;
    });
    builder.addCase(getPendingAdminRequests.rejected, (state, action) => {
      state.pendingRequestsLoading = false;
      state.pendingRequestsError = action.payload;
      state.pendingRequests = [];
      state.pendingRequestsCount = 0;
    });
  },
});

export const { clearState, clearAdminState } = profileSlice.actions;

export default profileSlice.reducer;
