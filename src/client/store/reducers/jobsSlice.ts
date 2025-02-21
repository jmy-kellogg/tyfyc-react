import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Job, JobsList } from "../../../types";

export interface JobsState {
  list: JobsList;
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

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    updateJobs: (state: JobsState, action: PayloadAction<JobsList>) => {
      state.list = action.payload;
    },
    addNewJob(state: JobsState) {
      const newItem: Job = {
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

export const { updateJobs, addNewJob, removeJob } = jobsSlice.actions;
export default jobsSlice.reducer;
