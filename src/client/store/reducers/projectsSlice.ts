import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ProjectsList } from "../../../types";

export type ProjectsState = ProjectsList;

const initialState: ProjectsList = [
  {
    title: "",
    description: "",
    year: "",
    url: "",
  },
];

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (
      _state: ProjectsState,
      action: PayloadAction<ProjectsList>
    ) => {
      return action.payload;
    },
    addNewProject(state: ProjectsState) {
      const newItem = {
        title: "",
        description: "",
        year: "",
        url: "",
      };
      state.push(newItem);
    },
    removeProject(state: ProjectsState, action: PayloadAction<number>) {
      state.splice(action.payload, 1);
    },
  },
});

export const { setProjects, addNewProject, removeProject } =
  projectsSlice.actions;
export default projectsSlice.reducer;
