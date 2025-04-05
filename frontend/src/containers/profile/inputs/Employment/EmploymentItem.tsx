import { useState, ChangeEvent } from "react";
import { getFormattedDate } from "@utils";

import type { Employment } from "@/types/employment";

interface Props {
  employment: Employment;
  editAll: boolean;
  lockEdit: boolean;
}

function EmploymentItem({ employment, lockEdit, editAll }: Props) {
  const [hover, setHover] = useState<boolean>(false);
  const [employmentForm, setEmploymentForm] = useState(employment);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const key = e.target.name;
    const value = e.target.value;
    setEmploymentForm({ ...employmentForm, [key]: value });
  };

  const remove = () => {
    console.log("Remove NEW");
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
              value={employmentForm.jobTitle}
              onChange={handleChange}
            />
            <div className="flex">
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Company"
                className="m-1 block font-bold w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={employmentForm.company}
                onChange={handleChange}
              />

              <input
                id="location"
                name="location"
                type="text"
                placeholder="Location"
                className="m-1 block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={employmentForm.location}
                onChange={handleChange}
              />

              <input
                id="start"
                name="start"
                type="month"
                placeholder="Start Date"
                className="m-1 block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={employmentForm.start}
                onChange={handleChange}
              />
              <p className="font-bold self-center"> - </p>
              <input
                id="end"
                name="end"
                type="month"
                placeholder="End Date"
                className="m-1 block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={employmentForm.end}
                onChange={handleChange}
              />
            </div>

            <label className="block text-sm/6 font-medium">Description</label>
            <textarea
              id="description"
              name="description"
              className="block w-full rounded-md bg-white px-3 py-1.5 h-32 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={employmentForm.description}
              onChange={handleChange}
            ></textarea>

            <button
              type="button"
              className="rounded-md text-sm/6 my-3 px-2 py-1 outline-1 -outline-offset-1 outline-gray-300 font-semibold shadow-sm hover:bg-indigo-300 outline-1"
              onClick={remove}
            >
              Remove {employmentForm.company}
            </button>
          </div>
        ) : (
          <div key={employment.id}>
            <div>
              <h3>{employmentForm.jobTitle || "New Employment"}</h3>
              <h4>
                {employmentForm.company} - {employmentForm.location}
                {" | "}
                {getFormattedDate(employmentForm.start, {
                  month: "short",
                  year: "numeric",
                }) +
                  " - " +
                  getFormattedDate(employmentForm.end, {
                    month: "short",
                    year: "numeric",
                  })}
              </h4>
              <p className="whitespace-pre-wrap">
                {employmentForm.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default EmploymentItem;
