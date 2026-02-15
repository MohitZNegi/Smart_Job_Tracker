import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// The initial state of our 'jobs' slice.
const initialState = {
  jobs: [],
  savedJobs: [],
  status: 'idle', // Can be 'idle', 'loading', 'succeeded', or 'failed'
  error: null,
  searchQuery: '',
};

// createAsyncThunk is a function from Redux Toolkit that simplifies handling asynchronous actions.
// We use it here to fetch jobs from the Remotive API.
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (query) => {
    const normalizedQuery = query?.trim() || 'react';
    const response = await axios.get(
      `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(normalizedQuery)}`
    );
    return response.data.jobs;
  }
);

// createSlice is a function from Redux Toolkit that generates a slice of the Redux store,
// including action creators and a reducer, based on a name, initial state, and a set of reducers.
const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  // reducers is an object containing the synchronous reducers for this slice.
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    saveJob: (state, action) => {
      // Prevent duplicate jobs from being saved.
      if (state.savedJobs.find((j) => j.id === action.payload.id)) return;
      state.savedJobs.push(action.payload);
    },
    removeSavedJob: (state, action) => {
      state.savedJobs = state.savedJobs.filter(
        (job) => job.id !== action.payload
      );
    },
  },
  // extraReducers allows you to handle actions that were not defined in the reducers object.
  // We use it here to handle the different states of our async thunk.
  extraReducers: (builder) => {
    builder
      // When the fetchJobs thunk is pending (i.e., the API call is in progress),
      // we set the status to 'loading' and clear any previous errors.
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // When the fetchJobs thunk is fulfilled (i.e., the API call was successful),
      // we set the status to 'succeeded' and update the jobs array with the data from the API.
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
      })
      // When the fetchJobs thunk is rejected (i.e., the API call failed),
      // we set the status to 'failed' and store the error message.
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// We export the action creators so they can be used in our components to dispatch actions.
export const { setSearchQuery, saveJob, removeSavedJob } = jobsSlice.actions;

// We export the reducer so it can be added to our Redux store.
export default jobsSlice.reducer;
