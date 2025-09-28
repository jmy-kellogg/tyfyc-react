import React, { useState, ChangeEvent, FocusEvent } from "react";

import { getFormattedDate } from "@utils";
import { updateEducation } from "@/api/education";
import type { Education } from "@/types";

interface EducationItemProps {
  education: Education;
  lockEdit: boolean;
  remove: (id: string) => void;
}

const EducationItem: React.FC<EducationItemProps> = ({
  education,
  lockEdit,
  remove,
}) => {
  const [form, setForm] = useState<Education>(education);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const key: string = e.target.name;
    const value: string = e.target.value;
    setForm({ ...form, [key]: value });
  };

  const updateData = async (
    key: keyof Education,
    value: string
  ): Promise<void> => {
    if (value && education[key] !== value) {
      const updateBody: Partial<Education> = {
        school: form.school,
        gradYear: form.gradYear,
        degree: form.degree,
      };
      await updateEducation(education.id, updateBody);
    }
  };

  return (
    <>
      {lockEdit ? (
        <div>
          <p>
            {form.school ||
              "New School" +
                " - " +
                getFormattedDate(form.gradYear, {
                  month: "short",
                  year: "numeric",
                })}
          </p>
          <p>{form.degree || "Degree"}</p>
        </div>
      ) : (
        <div className="my-3">
          <div className="flex">
            <input
              id="school"
              name="school"
              type="text"
              placeholder="School"
              className="w-full rounded-md bg-white m-1 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={form.school}
              onChange={handleChange}
              onBlur={(e: FocusEvent<HTMLInputElement>): void => {
                e.stopPropagation();
                updateData("school", e.target.value);
              }}
            />
            <input
              id="grad-year"
              name="gradYear"
              type="month"
              placeholder="Graduated Date"
              className="w-full rounded-md bg-white m-1 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={form.gradYear}
              onChange={handleChange}
              onBlur={(e: FocusEvent<HTMLInputElement>): void => {
                e.stopPropagation();
                updateData("gradYear", e.target.value);
              }}
            />
            <button
              type="button"
              className="rounded-md align-sub text-red-600 m-1 p-1 hover:bg-red-100 hover:cursor-pointer"
              onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
                e.stopPropagation();
                remove(education.id);
              }}
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
          <div className="w-full m-1">
            <input
              id="degree"
              name="degree"
              type="text"
              placeholder="Degree"
              className="rounded-md w-full bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={form.degree}
              onChange={handleChange}
              onBlur={(e: FocusEvent<HTMLInputElement>): void => {
                e.stopPropagation();
                updateData("degree", e.target.value);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EducationItem;
