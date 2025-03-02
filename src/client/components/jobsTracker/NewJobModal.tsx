import { useState } from "react";
import { useDispatch } from "react-redux";

import JobEdit from "./jobPosting/JobEdit";
import { jobDefault } from "../../../utils/options";
import { addNewApplication } from "../../store/reducers/applicationsSlice";
import { setActiveTab, addJobTabs } from "../../store/reducers/settingsSlice";
import type { Application } from "../../../types";

function NewJobModal() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [application, setApplication] = useState<Application>(jobDefault);

  const addNew = () => {
    setShowModal(true);
  };

  const submit = () => {
    dispatch(addNewApplication(application));
    dispatch(
      addJobTabs({
        label: application.company || "Job",
        value: application.jobId,
      })
    );
    dispatch(setActiveTab(application.jobId));
    setShowModal(false);
  };

  const updateData = (
    field: string,
    value: string,
    application: Application
  ) => {
    setApplication({ ...application, [field]: value });
  };

  return (
    <>
      <button
        className="rounded-md bg-indigo-600 text-white my-3 p-2 font-semibold shadow-md hover:cursor-pointer hover:bg-indigo-500"
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
            <JobEdit application={application} updateData={updateData} />
            <div className="flex items-center p-4  border-t border-gray-400">
              <button
                type="button"
                className="rounded-md bg-indigo-600 text-white my-3 p-2 font-semibold shadow-md hover:cursor-pointer hover:bg-indigo-500"
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
