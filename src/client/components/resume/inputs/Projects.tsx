import { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setProjects,
  addNewProject,
  removeProject,
} from "../../../store/reducers/projectsSlice";
import { getFormattedDate, divider } from "@utils";

import type { Project, ProjectsList } from "../../../../types";
import type { State } from "../../../store";

interface Props {
  editAll: boolean;
  lockEdit: boolean;
}

function Projects({ editAll, lockEdit }: Props) {
  const dispatch = useDispatch();
  const projects: ProjectsList = useSelector((state: State) => state.projects);
  const [hover, setHover] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);

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
      <div
        onMouseEnter={() => setShowAdd(true)}
        onMouseLeave={() => setShowAdd(false)}
      >
        <h2>
          <b>Projects </b>
        </h2>
        {projects.map((project: Project, index: number) => (
          <div
            key={index}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
          >
            {!lockEdit && (editAll || hover === index) ? (
              <div className="my-3">
                <div className="flex">
                  <input
                    id="project-title"
                    name="title"
                    type="text"
                    placeholder="Title"
                    className="w-75 m-1 rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    value={project.title}
                    onChange={(e) => saveProject(e, index)}
                  />

                  <input
                    id="project-url"
                    name="url"
                    type="text"
                    placeholder="Url"
                    className="block m-1 w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    value={project.url}
                    onChange={(e) => saveProject(e, index)}
                  />
                  <button
                    type="button"
                    className="rounded-md align-sub text-red-600 m-1 p-1 hover:bg-red-100 hover:cursor-pointer"
                    onClick={() => remove(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
                <label className="block text-sm/6 font-medium">
                  Description
                </label>
                <textarea
                  id="project-description"
                  name="description"
                  className="m-1 w-full rounded-md bg-white px-3 py-1.5 h-24 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={project.description}
                  onChange={(e) => saveProject(e, index)}
                ></textarea>

                <label className="block text-sm/6 font-medium">Created</label>
                <input
                  id="project-year"
                  name="year"
                  type="month"
                  className="m-1 w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={project.year}
                  onChange={(e) => saveProject(e, index)}
                />
              </div>
            ) : (
              <div>
                <div className="body-sub-section">
                  {project.url ? (
                    <a href={project.url}>
                      {" "}
                      <h3>{project.title}</h3>
                    </a>
                  ) : (
                    <h3>{project.title}</h3>
                  )}
                  <p>{project.description}</p>
                  {project.year && (
                    <p>
                      {getFormattedDate(project.year, {
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
            )}
            <p className="divider">{divider()}</p>
          </div>
        ))}
        {!lockEdit && (editAll || showAdd) && (
          <button
            type="button"
            className="rounded-md bg-indigo-600 m-1 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={addNew}
          >
            Add Job
          </button>
        )}
      </div>
    </>
  );
}

export default Projects;
