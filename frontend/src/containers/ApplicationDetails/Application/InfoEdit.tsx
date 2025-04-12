import { useState, useEffect, ChangeEvent } from "react";
import { statusOptions } from "@options";
import { updateApplication } from "@/api/applications";

import type { ApplicationUpdate } from "@/types/applications";

interface Props {
  application: ApplicationUpdate;
  setShowForm: (status: boolean) => void;
}

function Info({ application, setShowForm }: Props) {
  const [formData, setFormData] = useState<ApplicationUpdate>({
    ...application,
  });
  const [isSavable, setIsSavable] = useState<boolean>(false);

  const onChangeData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const field = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [field]: value });
    setIsSavable(true);
  };

  const saveForm = async () => {
    await updateApplication(formData);
    setShowForm(false);
  };

  useEffect(() => {
    if (application.id && formData.id && application.id !== formData.id) {
      if (isSavable) {
        const updateData = async () => {
          await updateApplication(formData);
        };
        updateData();
        setIsSavable(false);
      }
      setShowForm(false);
    }
  }, [application, formData, setShowForm, isSavable]);

  return (
    <>
      <div className="text-end">
        {isSavable ? (
          <button
            className="rounded-full border-2 border-indigo-600 p-2 m-4 text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
            onClick={saveForm}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </button>
        ) : (
          <button
            className="rounded-full border-2 border-indigo-600 p-2 m-4 text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
            onClick={() => setShowForm(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="grid gap-2 grid-cols-8">
        <div className="col-span-4">
          <label className="block text-sm/6 font-medium">Company</label>
          <div className="mt-2">
            <input
              id="company"
              name="company"
              type="text"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={formData.company}
              onChange={onChangeData}
            />
          </div>
        </div>
        <div className="col-span-4">
          <label className="block text-sm/6 font-medium">Job Title</label>
          <div className="mt-2">
            <input
              id="title"
              name="title"
              type="text"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={formData.title}
              onChange={onChangeData}
            />
          </div>
        </div>
        <div className="col-span-4">
          <label className="block text-sm/6 font-medium">Company Site</label>
          <div className="mt-2">
            <input
              id="companySite"
              name="companySite"
              type="text"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={formData.companySite}
              onChange={onChangeData}
            />
          </div>
        </div>

        <div className="col-span-4">
          <label className="block text-sm/6 font-medium">
            Job Posting Link
          </label>
          <div className="mt-2">
            <input
              id="postingLink"
              name="postingLink"
              type="text"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={formData.postingLink}
              onChange={onChangeData}
            />
          </div>
        </div>
        <div className="col-span-2">
          <label className="block text-sm/6 font-medium">Status</label>
          <div className="mt-2">
            <select
              name="status"
              id="status"
              className="w-full rounded-md bg-white p-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={formData.status}
              onChange={onChangeData}
            >
              {statusOptions.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-span-2">
          <label className="block text-sm/6 font-medium">Date Applied</label>
          <div className="mt-2">
            <input
              id="dateApplied"
              name="dateApplied"
              type="date"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={formData.dateApplied}
              onChange={onChangeData}
            />
          </div>
        </div>
        <div className="col-span-2">
          <label className="block text-sm/6 font-medium">Location</label>
          <div className="mt-2">
            <input
              id="location"
              name="location"
              type="text"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={formData.location}
              onChange={onChangeData}
            />
          </div>
        </div>
        <div className="col-span-2">
          <label className="block text-sm/6 font-medium">Salary</label>
          <div className="mt-2">
            <input
              id="salary"
              name="salary"
              type="text"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={formData.salary}
              onChange={onChangeData}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Info;
