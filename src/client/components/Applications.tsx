import Papa from "papaparse";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStatus, getFormattedDate } from "../../utils";

import Tabs from "./Tabs";
import {
  addNewApplication,
  removeApplication,
  updateApplicationsList,
} from "../store/reducers/applicationsSlice";
import {
  setActiveTab,
  addJobTabs,
  removeJobTab,
  setTabs,
  setDefaultTab,
} from "../store/reducers/settingsSlice";
import type { State, Application, ApplicationsList } from "../../types";

function Applications() {
  const dispatch = useDispatch();
  const [sortedList, setSortedList] = useState<ApplicationsList>([]);
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
    const jobId = uuidv4();
    dispatch(addNewApplication(jobId));
    dispatch(addJobTabs({ label: "Job", value: jobId }));
    dispatch(setActiveTab(jobId));
    dispatch(setTabs());
  };

  const remove = (jobId: string) => {
    dispatch(removeApplication(jobId));
    dispatch(removeJobTab(jobId));
    dispatch(setDefaultTab());
  };
  const getStatusColor = (status: Application["status"]) => {
    const colorMap = {
      applied: "text-blue-400",
      interviewing: "text-emerald-400",
      no_offer: "text-amber-400",
      declined: "text-rose-400",
      auto_rejected: "text-gray-400",
      pending: "text-purple-400",
    };
    return colorMap[status];
  };

  const onFilePicked = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files || [];
    const file: File = files[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        complete: function (results) {
          const data = results.data;
          if (!data || !data.length) {
            console.error("Must be a TYFYC CSV");
          } else {
            const jobIdLists = applications.map(({ jobId }) => jobId);
            const uploaded: ApplicationsList = data
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .filter((item: any) => {
                return item?.jobId && !jobIdLists.includes(item.jobId);
              })
              .map((item) => {
                return {
                  company: item?.company || "",
                  description: item?.description || "",
                  title: item?.title || "",
                  salary: item?.salary || "",
                  dateApplied: item?.dateApplied || "",
                  location: item?.location || "",
                  status: item?.status || "applied",
                  interviewStages: item?.interviewStages || [],
                  notes: item?.notes || "",
                  postingLink: item?.postingLink || "",
                  companyLink: item?.companyLink || "",
                  jobId: item?.jobId || "",
                };
              });

            if (uploaded.length) {
              dispatch(updateApplicationsList([...applications, ...uploaded]));
            }
          }
        },
        error: function (error) {
          console.error("Error parsing CSV:", error);
        },
      });
    }
  };
  useEffect(() => {
    const order = [
      "interviewing",
      "applied",
      "pending",
      "declined",
      "no_offer",
      "auto_rejected",
    ];

    const sortedList = [...applications]
      .sort((a, b) => {
        const aDate = new Date(a.dateApplied).getTime();
        const bDate = new Date(b.dateApplied).getTime();
        return bDate - aDate;
      })
      .sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status));

    setSortedList(sortedList);
  }, [applications]);

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
            <div className="flex place-content-between min-w-85">
              <h2>Job Applications</h2>
              <div className="m-3 self-center rounded-md border-2 border-indigo-600 p-3 text-sm font-semibold text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer">
                <label>
                  <span>Import CSV</span>
                  <input
                    id="csv-upload"
                    name="csvUpload"
                    type="file"
                    className="sr-only"
                    accept=".csv"
                    onChange={onFilePicked}
                  />
                </label>
              </div>
            </div>
            {sortedList.map((application) => (
              <div
                className="flex place-content-between  border-b-1 border-zinc-300 hover:bg-indigo-100 hover:cursor-pointer"
                key={application.jobId}
                onClick={() => openApplication(application)}
              >
                <span className="text-l p-3">
                  <b>{application.company}</b> - {application.title}
                </span>
                <span className="text-l p-3">
                  |{" "}
                  <b
                    className={`rounded-md p-1 ${getStatusColor(
                      application.status
                    )}`}
                  >
                    {getStatus(application.status)?.label || ""}
                  </b>{" "}
                  | {getFormattedDate(application.dateApplied)}
                </span>
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
