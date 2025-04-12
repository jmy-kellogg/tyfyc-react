import { useState, ChangeEvent } from "react";
import { getFormattedDate } from "@utils";

import { updateEmployment } from "@/api/employment";
import type { Employment } from "@/types/employment";

interface Props {
  employment: Employment;
  editAll: boolean;
  lockEdit: boolean;
  remove: (id: string) => void;
}

function EmploymentItem({ employment, lockEdit, editAll, remove }: Props) {
  const [hover, setHover] = useState<boolean>(false);
  const [form, setForm] = useState<Employment>(employment);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const key = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [key]: value });
  };

  const updateData = async (key: keyof Employment, value: string) => {
    if (value && employment[key] !== value) {
      const updateBody = {
        jobTitle: form.jobTitle,
        company: form.company,
        start: form.start,
        end: form.end,
        location: form.location,
        description: form.description,
      };
      await updateEmployment(employment.id, updateBody);
    }
  };

  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {!lockEdit && (editAll || hover) ? (
          <div className="my-3">
            <input
              id="jobTitle"
              name="jobTitle"
              type="text"
              placeholder="Job Title"
              className="m-1 block font-bold w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={form.jobTitle}
              onChange={handleChange}
              onBlur={(e) => updateData("jobTitle", e.target.value)}
            />
            <div className="flex">
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Company"
                className="m-1 block font-bold w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={form.company}
                onChange={handleChange}
                onBlur={(e) => updateData("company", e.target.value)}
              />

              <input
                id="location"
                name="location"
                type="text"
                placeholder="Location"
                className="m-1 block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={form.location}
                onChange={handleChange}
                onBlur={(e) => updateData("location", e.target.value)}
              />

              <input
                id="start"
                name="start"
                type="month"
                placeholder="Start Date"
                className="m-1 block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={form.start}
                onChange={handleChange}
                onBlur={(e) => updateData("start", e.target.value)}
              />
              <p className="font-bold self-center"> - </p>
              <input
                id="end"
                name="end"
                type="month"
                placeholder="End Date"
                className="m-1 block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={form.end}
                onChange={handleChange}
                onBlur={(e) => updateData("end", e.target.value)}
              />
            </div>

            <label className="block text-sm/6 font-medium">Description</label>
            <textarea
              id="description"
              name="description"
              className="block w-full rounded-md bg-white px-3 py-1.5 h-32 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={form.description}
              onChange={handleChange}
            ></textarea>

            <button
              type="button"
              className="rounded-md text-sm/6 my-3 px-2 py-1 outline-1 -outline-offset-1 outline-gray-300 font-semibold shadow-sm hover:bg-indigo-300 outline-1"
              onClick={() => remove(employment.id)}
            >
              Remove {form.company}
            </button>
          </div>
        ) : (
          <div key={employment.id}>
            <div>
              <h3>{form.jobTitle || "New Employment"}</h3>
              <h4>
                {form.company} - {form.location}
                {" | "}
                {getFormattedDate(form.start, {
                  month: "short",
                  year: "numeric",
                }) +
                  " - " +
                  getFormattedDate(form.end, {
                    month: "short",
                    year: "numeric",
                  })}
              </h4>
              <p className="whitespace-pre-wrap">{form.description}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default EmploymentItem;
