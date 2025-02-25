import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { JobHistory, JobHistoryList } from "../../../types";

export interface JobsState {
  list: JobHistoryList;
}

const initialState: JobsState = {
  list: [
    {
      title: "",
      company: "",
      location: "",
      start: "",
      end: "",
      description: "",
    },
  ],
};

export const jobHistorySlice = createSlice({
  name: "jobHistory",
  initialState,
  reducers: {
    setJobs: (state: JobsState, action: PayloadAction<JobHistoryList>) => {
      state.list = action.payload;
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
      state.list.push(newItem);
    },
    removeJob(state: JobsState, action: PayloadAction<number>) {
      state.list.splice(action.payload, 1);
    },
  },
});

export const { setJobs, addNewJob, removeJob } = jobHistorySlice.actions;
export default jobHistorySlice.reducer;
