import { v4 as uuidv4 } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  ApplicationsState,
  ApplicationsList,
  Application,
} from "../../../types";

const initialState: ApplicationsState = {
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
    addNewApplication: (
      state: ApplicationsState,
      action: PayloadAction<string | undefined>
    ) => {
      const jobId = action.payload || uuidv4();
      const defaultApplication: Application = {
        company: "",
        description: "",
        title: "",
        salary: "",
        dateApplied: "",
        location: "",
        status: "pending",
        interviewStages: [],
        notes: "",
        postingLink: "",
        companyLink: "",
        jobId,
      };
      state.list = [...state.list, defaultApplication];
    },
    removeApplication: (
      state: ApplicationsState,
      action: PayloadAction<string>
    ) => {
      state.list = state.list.filter(({ jobId }) => jobId !== action.payload);
    },
    updateApplication: (
      state: ApplicationsState,
      action: PayloadAction<Application>
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
  addNewApplication,
  removeApplication,
  updateApplication,
} = ApplicationsSlice.actions;
export default ApplicationsSlice.reducer;
