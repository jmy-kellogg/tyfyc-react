import { useState, ChangeEvent } from "react";

import { getFormattedDate } from "@utils";
import RichEditor from "@/components/RichEditor";
import ReadOnly from "@/components/RichEditor/ReadOnly";
import { updateProject } from "@/api/projects";
import type { Project } from "@/types/projects";

interface Props {
  project: Project;
  editAll: boolean;
  lockEdit: boolean;
  remove: (id: string) => void;
}

function ProjectItem({ project, editAll, lockEdit, remove }: Props) {
  const [form, setForm] = useState<Project>(project);
  const [hover, setHover] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const key = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [key]: value });
  };

  const updateData = async (key: keyof Project, value: string) => {
    if (value && project[key] !== value) {
      const updateBody = {
        title: form.title,
        description: form.description,
        year: form.year,
        url: form.url,
      };
      await updateProject(project.id, updateBody);
    }
  };

  const setDescription = (text: string) => {
    setForm({ ...form, description: text });
  };

  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {!lockEdit && (editAll || hover) ? (
          <div className="my-3">
            <div className="flex">
              <input
                id="project-title"
                name="title"
                type="text"
                placeholder="Title"
                className="w-75 m-1 rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={form.title}
                onChange={handleChange}
                onBlur={(e) => updateData("title", e.target.value)}
              />

              <input
                id="project-url"
                name="url"
                type="text"
                placeholder="Url"
                className="block m-1 w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={form.url}
                onChange={handleChange}
                onBlur={(e) => updateData("url", e.target.value)}
              />
              <button
                type="button"
                className="rounded-md align-sub text-red-600 m-1 p-1 hover:bg-red-100 hover:cursor-pointer"
                onClick={() => remove(form.id)}
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
            <label className="block text-sm/6 font-medium">Description</label>
            {/* <textarea
              id="project-description"
              name="description"
              className="m-1 w-full rounded-md bg-white px-3 py-1.5 h-24 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={form.description}
              onChange={handleChange}
              onBlur={(e) => updateData("description", e.target.value)}
            ></textarea> */}
            <RichEditor
              content={form.description}
              onTextChange={setDescription}
            />

            <label className="block text-sm/6 font-medium">Created</label>
            <input
              id="project-year"
              name="year"
              type="month"
              className="m-1 w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={form.year}
              onChange={handleChange}
              onBlur={(e) => updateData("year", e.target.value)}
            />
          </div>
        ) : (
          <div>
            <div>
              {form.url ? (
                <a href={form.url}>
                  {" "}
                  <h3>{form.title}</h3>
                </a>
              ) : (
                <h3>{form.title}</h3>
              )}
              <ReadOnly content={form.description} />
              {form.year && (
                <p>
                  {getFormattedDate(form.year, {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProjectItem;
