import { v4 as uuidv4 } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  ApplicationsState,
  ApplicationsList,
  PostingState,
} from "../../../types";

const initialState: ApplicationsState = {
  openTabs: [],
  list: [],
};

export const ApplicationsSlice = createSlice({
  name: "posting",
  initialState,
  reducers: {
    updateApplicationsList: (
      state: ApplicationsState,
      action: PayloadAction<ApplicationsList>
    ) => {
      state.list = action.payload;
    },
    updateOpenTabs: (
      state: ApplicationsState,
      action: PayloadAction<Array<string>>
    ) => {
      state.openTabs = action.payload;
    },
    addNewApplication: (state: ApplicationsState) => {
      const jobId = uuidv4();
      const defaultApplication: PostingState = {
        company: "",
        description: "",
        title: "",
        salary: "",
        dateApplied: "",
        location: "",
        status: "applied",
        interviewStages: [],
        notes: "",
        postingLink: "",
        companyLink: "",
        jobId,
      };
      state.openTabs = [...state.openTabs, jobId];
      state.list = [...state.list, defaultApplication];
    },
    removeApplication: (
      state: ApplicationsState,
      action: PayloadAction<string>
    ) => {
      state.openTabs = state.openTabs.filter(
        (jobId) => jobId !== action.payload
      );
      state.list = state.list.filter(({ jobId }) => jobId !== action.payload);
    },
    updateApplication: (
      state: ApplicationsState,
      action: PayloadAction<PostingState>
    ) => {
      const index = state.list.findIndex(
        ({ jobId }) => jobId === action.payload.jobId
      );
      state.list[index] = action.payload;
    },
  },
});

export const {
  updateApplicationsList,
  updateOpenTabs,
  addNewApplication,
  removeApplication,
  updateApplication,
} = ApplicationsSlice.actions;
export default ApplicationsSlice.reducer;
