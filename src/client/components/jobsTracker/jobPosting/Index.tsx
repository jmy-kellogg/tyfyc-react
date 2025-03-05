import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import JobEdit from "./JobEdit";
import JobDoc from "./JobDoc";
import ExportCSV from "../ExportCSV";
import Tabs from "../../Tabs";
import { updateApplication } from "../../../store/reducers/applicationsSlice";
import {
  setActiveTab,
  getActiveTab,
  setJobTab,
} from "../../../store/reducers/settingsSlice";

import type { Application } from "../../../../types";
import type { State } from "../../../store";

function JobPosting() {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState<boolean>(false);
  const activeTab = useSelector(getActiveTab);
  const applications = useSelector((state: State) => state.applications);
  const jobTabs = useSelector((state: State) => state.settings.jobTabs);
  const smallDisplay = useSelector(
    (state: State) => state.settings.smallDisplay
  );

  const setActive = (jobId: string) => {
    dispatch(setActiveTab(jobId));
  };

  const updateData = (
    field: string,
    value: string,
    application: Application
  ) => {
    if (field === "company") {
      dispatch(setJobTab({ label: value, value: application.jobId }));
    }
    dispatch(updateApplication({ ...application, [field]: value }));
  };

  useEffect(() => {
    const activeJob = applications.find(({ jobId }) => jobId === activeTab);
    const isNew = !activeJob?.company;
    if (activeJob && isNew) {
      setShowForm(true);
    }
  }, [activeTab, applications]);

  return (
    <>
      <div>
        {!smallDisplay && (
          <Tabs tabs={jobTabs || []} active={activeTab} setActive={setActive} />
        )}
        {jobTabs?.map(({ value }) => {
          const application = applications.find((job) => job.jobId === value);
          if (application) {
            return (
              activeTab === value && (
                <div
                  key={application.jobId}
                  className="w-full min-w-100 max-w-3xl"
                >
                  <div className="bg-white text-end">
                    {!showForm && <ExportCSV label="Save" />}
                    <button
                      className="rounded-full border-2 border-indigo-600 p-2 m-4 text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
                      onClick={() => setShowForm(!showForm)}
                    >
                      {showForm ? (
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
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      ) : (
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
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className="bg-white p-5 pt-0">
                    {showForm ? (
                      <JobEdit
                        application={application}
                        updateData={updateData}
                      />
                    ) : (
                      <JobDoc application={application} />
                    )}
                  </div>
                </div>
              )
            );
          }
        })}
      </div>
    </>
  );
}

export default JobPosting;
