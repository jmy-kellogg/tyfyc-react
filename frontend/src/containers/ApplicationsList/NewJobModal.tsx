import { useState } from "react";
import { useDispatch } from "react-redux";

import { addApplication } from "@/api/applications";
import { getToday } from "@/utils";

import { setActiveTab, addJobTabs } from "src/store/reducers/settingsSlice";
import type { ApplicationCreate, Application } from "@/types/applications";

function NewJobModal() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [posting, setPosting] = useState<string>("");

  const submit = async () => {
    const reqBody: ApplicationCreate = {
      posting: posting,
      dateApplied: getToday(),
      status: "applied",
    };

    const application: Application = await addApplication(reqBody);

    if (application.id) {
      dispatch(
        addJobTabs({
          label: application.company || "Job",
          value: application.id,
        })
      );
      dispatch(setActiveTab(application.id));
      setShowModal(false);
    }
  };

  return (
    <>
      <button
        className="rounded-md bg-indigo-600 text-white m-3 p-2 font-semibold shadow-md hover:cursor-pointer hover:bg-indigo-500"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add Application
      </button>

      {showModal && (
        <div
          id="default-modal"
          className="backdrop-brightness-50 overflow-y-auto overflow-x-hidden fixed z-50 w-full md:inset-0 h-full"
        >
          <div className="bg-white p-4 w-2xl h-auto rounded-lg m-auto mt-10">
            <div className="flex items-center justify-between p-4 border-b border-slate-300 rounded-t">
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
            <div className="m-3">
              <label className="block text-lg font-medium text-center">
                Copy/Paste job Posting
              </label>
              <textarea
                id="posting"
                name="posting"
                className="w-full min-h-100 rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={posting}
                onChange={(e) => setPosting(e.target.value)}
              ></textarea>
            </div>

            <div className="flex items-center p-4  border-t border-slate-300">
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
