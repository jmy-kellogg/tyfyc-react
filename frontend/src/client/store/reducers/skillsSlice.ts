import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Skill, SkillsList } from "@types";

export type SkillsState = SkillsList;

const initialState: SkillsState = [
  {
    label: "JavaScript",
    value: "javascript",
  },
];

export const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    setSkills: (_state: SkillsState, action: PayloadAction<SkillsList>) => {
      return action.payload;
    },
    addSkill(state: SkillsState, action: PayloadAction<Skill>) {
      state.push(action.payload);
    },
    removeSkill(state: SkillsState, action: PayloadAction<number>) {
      state.splice(action.payload, 1);
    },
  },
});

export const { setSkills, addSkill, removeSkill } = skillsSlice.actions;
export default skillsSlice.reducer;
