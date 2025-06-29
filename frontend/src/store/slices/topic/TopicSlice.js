import { createSlice } from "@reduxjs/toolkit";
import { getAllTopics, addTopic, deleteTopic, clearTopicQuestions } from "./TopicAction";

const initialState = {
  loading: false,
  error: null,
  topics: [],
  singleTopic: {},
  success: false,
  topicQuestions: [],
};

const topicSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    getSingleTopic: (state, action) => {
      state.singleTopic = action.payload;
      state.topicQuestions = action.payload.questions;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTopics.pending, (state, payload) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getAllTopics.fulfilled, (state, action) => {
      state.loading = false;
      state.topics = action.payload;
      state.success = true;
    });
    builder.addCase(getAllTopics.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(addTopic.pending, (state, payload) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(addTopic.fulfilled, (state, action) => {
      state.loading = false;
      state.singleTopic = action.payload;
      state.success = true;
    });
    builder.addCase(addTopic.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(deleteTopic.pending, (state, payload) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(deleteTopic.fulfilled, (state, action) => {
      state.loading = false;
      state.topics = action.payload;
      state.success = true;
    });
    builder.addCase(deleteTopic.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(clearTopicQuestions.pending, (state, payload) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(clearTopicQuestions.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      if (state.singleTopic._id === action.payload.topic._id) {
        state.singleTopic = action.payload.topic;
        state.topicQuestions = [];
      }
    });
    builder.addCase(clearTopicQuestions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});

export const { clearState, getSingleTopic } = topicSlice.actions;

export default topicSlice.reducer;
