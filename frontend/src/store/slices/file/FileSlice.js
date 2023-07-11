import { createSlice } from "@reduxjs/toolkit";
import { fileUpload } from "./FileAction";


const initialState = {
  loading: false,
  error: null,
  currentFileUrl: {},
  success: false,
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fileUpload.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(fileUpload.fulfilled, (state, action) => {
      state.loading = false;
      state.currentFileUrl = action.payload;
      state.success = true;
    });
    builder.addCase(fileUpload.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});

export default fileSlice.reducer;
