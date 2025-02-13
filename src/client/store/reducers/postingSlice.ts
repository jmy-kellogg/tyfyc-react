import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { PostingState } from "../../../types";

type PostingStateUpdate = Partial<PostingState>;

const initialState: PostingState = {
  company: "",
  description: "",
  title: "",
  salary: "",
  dateApplied: "",
  location: "",
  isRemote: true,
  status: "applied",
  interviewStages: [],
  notes: "",
  postingLink: "",
  companyLink: "",
};

export const postingSlice = createSlice({
  name: "posting",
  initialState,
  reducers: {
    updatePosting: (
      state: PostingState,
      action: PayloadAction<PostingStateUpdate>
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updatePosting } = postingSlice.actions;
export default postingSlice.reducer;
