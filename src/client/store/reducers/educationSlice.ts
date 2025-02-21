import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { EducationList } from "../../../types";

export interface EducationState {
  list: EducationList;
}

const initialState: EducationState = {
  list: [
    {
      degree: "",
      school: "",
      gradYear: "",
    },
  ],
};

export const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    updateEducation: (
      state: EducationState,
      action: PayloadAction<EducationList>
    ) => {
      state.list = action.payload;
    },
    addNewEdu(state: EducationState) {
      const newItem = {
        degree: "",
        school: "",
        gradYear: "",
      };
      state.list.push(newItem);
    },
    removeEdu(state: EducationState, action: PayloadAction<number>) {
      state.list.splice(action.payload, 1);
    },
  },
});

export const { updateEducation, addNewEdu, removeEdu } = educationSlice.actions;
export default educationSlice.reducer;
