import { ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setProjects,
  addNewProject,
  removeProject,
} from "../../../store/reducers/projectsSlice";

import type { Project, ProjectsList } from "../../../../types";
import type { State } from "../../../store";

function Projects() {
  const projects: ProjectsList = useSelector((state: State) => state.projects);
  const dispatch = useDispatch();

  const saveProject = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newProject = [...projects];
    const project = newProject[index];
    newProject[index] = {
      ...project,
      ...{ [e.target.name]: e.target.value },
    };
    dispatch(setProjects(newProject));
  };

  const addNew = () => {
    dispatch(addNewProject());
  };

  const remove = (index: number) => {
    dispatch(removeProject(index));
  };

  return (
    <>
      <div className="sm:col-span-4">
        <h2>
          <b>Projects </b>
        </h2>
        {projects.map((project: Project, index: number) => (
          <div className="sm:col-span-4" key={index}>
            <label className="block text-sm/6 font-medium">Title</label>
            <input
              id="project-title"
              name="title"
              type="text"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={project.title}
              onChange={(e) => saveProject(e, index)}
            />
            <label className="block text-sm/6 font-medium">Url</label>
            <input
              id="project-url"
              name="url"
              type="text"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={project.url}
              onChange={(e) => saveProject(e, index)}
            />

            <label className="block text-sm/6 font-medium">Description</label>
            <textarea
              id="project-description"
              name="description"
              className="block w-full rounded-md bg-white px-3 py-1.5 h-32 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={project.description}
              onChange={(e) => saveProject(e, index)}
            ></textarea>

            <label className="block text-sm/6 font-medium">Created</label>
            <input
              id="project-year"
              name="year"
              type="month"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={project.year}
              onChange={(e) => saveProject(e, index)}
            />

            <button
              type="button"
              className="rounded-md text-sm/6 my-3 px-2 py-1 outline-1 -outline-offset-1 outline-gray-300 font-semibold shadow-sm hover:bg-indigo-300 outline-1"
              onClick={() => remove(index)}
            >
              Remove {project.title}
            </button>
          </div>
        ))}
        <button
          type="button"
          className="rounded-md bg-indigo-600 my-3 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={addNew}
        >
          Add Project
        </button>
      </div>
    </>
  );
}

export default Projects;
