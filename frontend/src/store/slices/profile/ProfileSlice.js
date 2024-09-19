import { createSlice } from "@reduxjs/toolkit";
import { getAllProfiles, addProfile, getProfileById } from "./ProfileAction";

const initialState = {
  loading: false,
  error: null,
  profiles: [],
  singleProfile: {},
  success: false,
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
  },
});

export const { logOut, clearState, isTokenValid } = profileSlice.actions;

export default profileSlice.reducer;
