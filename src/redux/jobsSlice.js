import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  jobs: [],
  savedJobs: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
  searchQuery: '',
};

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (query) => {
    const response = await axios.get(
      `https://remotive.com/api/remote-jobs?search=${query}`
    );
    return response.data.jobs;
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    saveJob: (state, action) => {
      state.savedJobs.push(action.payload);
    },
    removeSavedJob: (state, action) => {
      state.savedJobs = state.savedJobs.filter(
        (job) => job.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSearchQuery, saveJob, removeSavedJob } = jobsSlice.actions;

export default jobsSlice.reducer;
