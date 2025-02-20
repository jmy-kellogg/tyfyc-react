import { useState, ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";

import { statusOptions } from "../../../utils";
import { addNewApplication } from "../../store/reducers/applicationsSlice";
import {
  setActiveTab,
  addJobTabs,
  setTabs,
} from "../../store/reducers/settingsSlice";
import type { Application } from "../../../types";

function NewJobModal() {
  const dispatch = useDispatch();
  const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const day = today.getDate();
    const formattedDate = `${year}-${formattedMonth}-${day}`;

    return formattedDate;
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  const [application, setApplication] = useState<Application>({
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
  });

  const addNew = () => {
    setShowModal(true);
  };

  const submit = () => {
    dispatch(addNewApplication(application));
    dispatch(addJobTabs({ label: "Job", value: application.jobId }));
    dispatch(setActiveTab(application.jobId));
    dispatch(setTabs());
    setShowModal(false);
  };

  const updateData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const field = e.target.name;
    const value = e.target.value;
    setApplication({ ...application, [field]: value });
  };

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

    setApplication(newApp);
  };

  return (
    <>
      <button
        className="rounded-md bg-indigo-600 my-3 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        type="button"
        onClick={addNew}
      >
        Add Application
      </button>

      {showModal && (
        <div
          id="default-modal"
          className="backdrop-brightness-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full"
        >
          <div className="bg-white m-auto my-20 p-4 w-2xl h-auto rounded-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-400 rounded-t">
              <h3 className="text-xl font-semibold">Add New</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={() => setShowModal(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="inline-block">
                <div className="grid gap-2">
                  <div className="col-span-2">
                    <label className="block text-sm/6 font-medium">
                      Company
                    </label>
                    <div className="mt-2">
                      <input
                        id="company"
                        name="company"
                        type="text"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        value={application.company}
                        onChange={updateData}
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
                        onChange={updateData}
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm/6 font-medium">
                      Job Title
                    </label>
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
                    <label className="block text-sm/6 font-medium">
                      Status
                    </label>
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
                        onChange={updateData}
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm/6 font-medium">
                      Location
                    </label>
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
                    <label className="block text-sm/6 font-medium">
                      Salary
                    </label>
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
                    <label className="block text-sm/6 font-medium">
                      Job Posting
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      className="w-full min-h-100 rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      value={application.description}
                      onChange={updateDescription}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center p-4  border-t border-gray-400">
              <button
                type="button"
                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-blue-800"
                onClick={submit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NewJobModal;
