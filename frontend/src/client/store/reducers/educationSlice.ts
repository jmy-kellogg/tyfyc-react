import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { EducationList } from "@types";

export type EducationState = EducationList;

const initialState: EducationState = [
  {
    degree: "",
    school: "",
    gradYear: "",
  },
];

export const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    setEducation: (
      _state: EducationState,
      action: PayloadAction<EducationList>
    ) => {
      return action.payload;
    },
    addNewEdu(state: EducationState) {
      const newItem = {
        degree: "",
        school: "",
        gradYear: "",
      };
      state.push(newItem);
    },
    removeEdu(state: EducationState, action: PayloadAction<number>) {
      state.splice(action.payload, 1);
    },
  },
});

export const { setEducation, addNewEdu, removeEdu } = educationSlice.actions;
export default educationSlice.reducer;
