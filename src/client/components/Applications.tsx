import { useSelector, useDispatch } from "react-redux";
import { getStatus, getFormattedDate } from "../../utils";

import Tabs from "./Tabs";
import {
  addNewApplication,
  removeApplication,
} from "../store/reducers/applicationsSlice";
import {
  setActiveTab,
  addJobTabs,
  removeJobTab,
  setTabs,
  setDefaultTab,
} from "../store/reducers/settingsSlice";
import type { State, Application } from "../../types";

function Applications() {
  const dispatch = useDispatch();
  const applications = useSelector((state: State) => state.applications.list);
  const activeTab = useSelector((state: State) => state.settings.activeTab);
  const showApplications = useSelector(
    (state: State) => state.settings.showApplications
  );
  const smallDisplay = useSelector(
    (state: State) => state.settings.smallDisplay
  );

  const openApplication = ({ company, jobId }: Application) => {
    dispatch(addJobTabs({ label: company || "Job", value: jobId }));
    dispatch(setActiveTab(jobId));
    dispatch(setTabs());
  };

  const addNew = () => {
    dispatch(addNewApplication());
  };

  const remove = (jobId: string) => {
    dispatch(removeApplication(jobId));
    dispatch(removeJobTab(jobId));
    dispatch(setDefaultTab());
  };

  return (
    <>
      {(smallDisplay ? activeTab === "applications" : showApplications) && (
        <div>
          {!smallDisplay && (
            <Tabs
              tabs={[
                {
                  label: "Applications",
                  value: "applications",
                },
              ]}
              active="applications"
            />
          )}
          <div className="bg-white p-5">
            <h1>Job Applications List</h1>
            {applications.map((application) => (
              <div className="flex" key={application.jobId}>
                <button
                  className="text-xl hover:cursor-pointer hover:text-indigo-600 hover:font-bold"
                  onClick={() => openApplication(application)}
                >
                  {application.company} - {application.title} |{" "}
                  <span
                    className={`rounded-md p-1 bg-${
                      getStatus(application.status)?.color || "white"
                    }-100`}
                  >
                    {getStatus(application.status)?.label || ""}
                  </span>{" "}
                  | {getFormattedDate(application.dateApplied)}
                </button>
                <button
                  type="button"
                  className="rounded-md align-sub text-red-600 m-1 p-1 hover:bg-red-100"
                  onClick={() => remove(application.jobId)}
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
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            ))}
            <button
              type="button"
              className="rounded-md bg-indigo-600 my-3 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={addNew}
            >
              Add Application
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Applications;
