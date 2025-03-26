import { v4 as uuidv4 } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getToday } from "@utils";
import type { Applications, Application } from "@types";

export type ApplicationsState = Applications;

const initialState: ApplicationsState = [];

export const ApplicationsSlice = createSlice({
  name: "posting",
  initialState,
  reducers: {
    updateApplicationsList: (
      _state: ApplicationsState,
      action: PayloadAction<Applications>
    ) => {
      return action.payload;
    },
    addNewApplication: (
      state: ApplicationsState,
      action: PayloadAction<Application | undefined>
    ) => {
      const application = action.payload || {};
      const defaultApplication: Application = {
        company: "",
        description: "",
        title: "",
        salary: "",
        location: "",
        companySite: "",
        postingLink: "",
        dateApplied: getToday(),
        status: "applied",
        interviewStages: [],
        notes: "",
        skills: [],
        jobId: uuidv4(),
        resume: {
          summary: "",
        },
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
      action: PayloadAction<Application>
    ) => {
      const index = state.findIndex(
        ({ jobId }) => jobId === action.payload.jobId
      );
      state[index] = action.payload;
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
