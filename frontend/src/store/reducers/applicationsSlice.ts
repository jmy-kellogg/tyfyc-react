import { v4 as uuidv4 } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getToday } from "@utils";
import type { Application } from "@/types";

export interface ApplicationStore extends Application {
  description: string;
  interviewStages: Array<string>;
  notes: string;
  jobId: string;
  skills: Array<string>;
  resume: string;
}

export type ApplicationsState = Array<ApplicationStore>;

const initialState: ApplicationsState = [];

export const ApplicationsSlice = createSlice({
  name: "posting",
  initialState,
  reducers: {
    updateApplicationsList: (
      _state: ApplicationsState,
      action: PayloadAction<ApplicationsState>
    ) => {
      return action.payload;
    },
    addNewApplication: (
      state: ApplicationsState,
      action: PayloadAction<ApplicationStore | undefined>
    ) => {
      const application = action.payload || {};
      const id = uuidv4();
      const defaultApplication: ApplicationStore = {
        company: "",
        description: "",
        posting: "",
        title: "",
        salary: "",
        location: "",
        companySite: "",
        postingLink: "",
        dateApplied: getToday(),
        status: "applied",
        interviewStages: [],
        notes: "",
        summary: "",
        skills: [],
        id: id,
        jobId: id,
        resume: "",
        ...application,
      };
      return [...state, defaultApplication];
    },
    removeApplication: (
      state: ApplicationsState,
      action: PayloadAction<string>
    ) => {
      return state.filter(({ jobId }) => jobId !== action.payload);
    },
    updateApplication: (
      state: ApplicationsState,
      action: PayloadAction<Partial<ApplicationStore>>
    ) => {
      const index = state.findIndex(
        ({ jobId }) => jobId === action.payload.jobId
      );
      state[index] = { ...state[index], ...action.payload };
    },
  },
});

export const {
  updateApplicationsList,
  addNewApplication,
  removeApplication,
  updateApplication,
} = ApplicationsSlice.actions;
export default ApplicationsSlice.reducer;
