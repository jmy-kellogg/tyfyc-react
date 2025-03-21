import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { JobHistory, JobHistoryList } from "@types";

export type JobsState = JobHistoryList;

const initialState: JobsState = [
  {
    title: "",
    company: "",
    location: "",
    start: "",
    end: "",
    description: "",
  },
];
export const jobHistorySlice = createSlice({
  name: "jobHistory",
  initialState,
  reducers: {
    setJobs: (_state: JobsState, action: PayloadAction<JobHistoryList>) => {
      return action.payload;
    },
    addNewJob(state: JobsState) {
      const newItem: JobHistory = {
        title: "",
        company: "",
        location: "",
        start: "",
        end: "",
        description: "",
      };
      state.push(newItem);
    },
    removeJob(state: JobsState, action: PayloadAction<number>) {
      state.splice(action.payload, 1);
    },
  },
});

export const { setJobs, addNewJob, removeJob } = jobHistorySlice.actions;
export default jobHistorySlice.reducer;
