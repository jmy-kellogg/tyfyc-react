import { ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";

import { getToday } from "../../../../utils";
import { statusOptions } from "../../../../utils/options";
import type { Application } from "../../../../types";

interface Props {
  application?: Application;
  updateData: (field: string, value: string, application: Application) => void;
}

function JobEdit({
  application = {
    company: "",
    description: "",
    title: "",
    salary: "",
    dateApplied: getToday(),
    location: "",
    status: "applied",
    interviewStages: [],
    notes: "",
    postingLink: "",
    companyLink: "",
    jobId: uuidv4(),
  },
  updateData,
}: Props) {
  const findJobTitle = (parsedText: Array<string>) => {
    const title = parsedText.find((text) => {
      const lcText = text.toLocaleLowerCase();
      return lcText.includes("engineer") || lcText.includes("developer");
    });
    return title || "";
  };

  const findCompany = (parsedText: Array<string>) => {
    const isCap = /[A-Z]/;
    const company: Array<string> = [];

    const candidates = parsedText.filter((text) => {
      const startsWithAt = text.slice(0, 2).toLocaleLowerCase() === "at";
      const nextWord = text.split(" ")[1];
      return startsWithAt && isCap.test(nextWord);
    });

    if (candidates[0]) {
      const candidate: Array<string> = candidates[0].split(" ");
      for (let i = 1; i < 5; i++) {
        const word = candidate[i];
        if (word && isCap.test(word)) {
          company.push(word);
        } else {
          break;
        }
      }
    }

    return company.join(" ") || "";
  };

  // ToDo: Find city locations
  const findLocation = (parsedText: Array<string>) => {
    const firstItems = parsedText.slice(0, 5);
    const isRemote = firstItems.find((text) =>
      text.toLocaleLowerCase().includes("remote")
    );

    return isRemote ? "Remote" : "";
  };

  const onChangeData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const field = e.target.name;
    const value = e.target.value;

    updateData(field, value, application);
  };

  const updateDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const field = e.target.name;
    const value = e.target.value;
    const parsedText = value.split("\n").filter((str) => !!str);
    const newApp = { ...application, [field]: value };

    if (!newApp.title) {
      newApp.title = findJobTitle(parsedText);
    }
    if (!newApp.company) {
      newApp.company = findCompany(parsedText);
    }
    if (!newApp.location) {
      newApp.location = findLocation(parsedText);
    }
    updateData(field, value, newApp);
  };

  return (
    <>
      <div className="p-4 space-y-4">
        <div>
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
                  onChange={onChangeData}
                />
              </div>
            </div>
            <div className="col-span-4">
              <label className="block text-sm/6 font-medium">
                Company Site
              </label>
              <div className="mt-2">
                <input
                  id="companyLink"
                  name="companyLink"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={application.companyLink}
                  onChange={onChangeData}
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
                  value={application.postingLink}
                  onChange={onChangeData}
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
            <div className="col-span-1">
              <label className="block text-sm/6 font-medium">
                Date Applied
              </label>
              <div className="mt-2">
                <input
                  id="dateApplied"
                  name="dateApplied"
                  type="date"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={application.dateApplied}
                  onChange={onChangeData}
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
                  value={application.salary}
                  onChange={onChangeData}
                />
              </div>
            </div>

            <div className="col-span-6">
              <label className="block text-sm/6 font-medium">Job Posting</label>
              <textarea
                id="description"
                name="description"
                className="w-full min-h-100 rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={application.description}
                onChange={updateDescription}
              ></textarea>
            </div>
            <div className="col-span-6">
              <label className="block text-sm/6 font-medium">Notes</label>
              <textarea
                id="notes"
                name="notes"
                className="min-h-50 w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={application.notes}
                onChange={onChangeData}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobEdit;
