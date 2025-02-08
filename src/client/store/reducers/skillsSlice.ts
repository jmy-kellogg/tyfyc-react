import {  createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Skill {
  name: string,
  id: string,
}

type SkillsList =  Array<Skill>

interface SkillsState {
  list: SkillsList,
}

const initialState: SkillsState = {
    list: [
      {
        name: "JavaScript", 
        id: "javascript" 
      },
    ],
}

export const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    updateSkills: (state: SkillsState,  action: PayloadAction<SkillsList>) => {
      state.list = action.payload
    },
    addSkill(state: SkillsState, action: PayloadAction<Skill>) {
      state.list.push(action.payload);
    },
    removeSkill(state: SkillsState, action: PayloadAction<number>) {
      state.list.splice(action.payload, 1);
    },
  }
})

export const { updateSkills, addSkill, removeSkill  } = skillsSlice.actions
export default skillsSlice.reducer