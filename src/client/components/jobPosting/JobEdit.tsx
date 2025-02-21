import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import { statusOptions } from "../../../utils";
import { updateApplication } from "../../store/reducers/applicationsSlice";
import { updateTab, setTabs } from "../../store/reducers/settingsSlice";

import type { Application } from "../../../types";

interface Props {
  application: Application;
}

function JobEdit({ application }: Props) {
  const dispatch = useDispatch();

  const updateData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const field = e.target.name;
    const value = e.target.value;
    dispatch(updateApplication({ ...application, [field]: value }));
  };

  const updateCompanyName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(updateTab({ label: value, value: application.jobId }));
    dispatch(updateApplication({ ...application, company: value }));
    dispatch(setTabs());
  };

  return (
    <>
      <div className="inline-block">
        <div className="grid gap-2">
          <div className="col-span-2">
            <label className="block text-sm/6 font-medium">Company</label>
            <div className="mt-2">
              <input
                id="company"
                name="company"
                type="text"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={application.company}
                onChange={updateCompanyName}
              />
            </div>
          </div>
          <div className="col-span-4">
            <label className="block text-sm/6 font-medium">Company Site</label>
            <div className="mt-2">
              <input
                id="companyLink"
                name="companyLink"
                type="text"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={application.companyLink}
                onChange={updateData}
              />
            </div>
          </div>
          <div className="col-span-2">
            <label className="block text-sm/6 font-medium">Job Title</label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={application.title}
                onChange={updateData}
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
                value={application.postingLink}
                onChange={updateData}
              />
            </div>
          </div>
          <div className="col-span-1">
            <label className="block text-sm/6 font-medium">Status</label>
            <div className="mt-2">
              <select
                name="status"
                id="status"
                className="w-full rounded-md bg-white p-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={application.status}
                onChange={updateData}
              >
                {statusOptions.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-span-1">
            <label className="block text-sm/6 font-medium">Date Applied</label>
            <div className="mt-2">
              <input
                id="dateApplied"
                name="dateApplied"
                type="date"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={application.dateApplied}
                onChange={updateData}
              />
            </div>
          </div>
          <div className="col-span-1">
            <label className="block text-sm/6 font-medium">Location</label>
            <div className="mt-2">
              <input
                id="location"
                name="location"
                type="text"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={application.location}
                onChange={updateData}
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
                value={application.salary}
                onChange={updateData}
              />
            </div>
          </div>
          <div className="col-span-6">
            <label className="block text-sm/6 font-medium">Notes</label>
            <textarea
              id="notes"
              name="notes"
              className="min-h-50 w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={application.notes}
              onChange={updateData}
            ></textarea>
          </div>
          <div className="col-span-6">
            <label className="block text-sm/6 font-medium">Job Posting</label>
            <textarea
              id="description"
              name="description"
              className="h-250 w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={application.description}
              onChange={updateData}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobEdit;
