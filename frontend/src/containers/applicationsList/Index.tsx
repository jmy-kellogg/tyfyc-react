import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import { getStatus, getFormattedDate } from "@utils";
import { getApplications, deleteApplication } from "src/api/applications";
import getFlag from "@featureFlags";
import Tabs from "src/components/Tabs";
import ExportCSV from "./ExportCSV";
import ImportCSV from "./ImportCSV";
import NewJobModal from "./NewJobModal";

import {
  setActiveTab,
  addJobTabs,
  removeJobTab,
} from "src/store/reducers/settingsSlice";
import type { Application, Applications } from "@/types/applications";

interface Props {
  showTabs: boolean;
}

function ApplicationsList({ showTabs }: Props) {
  const dispatch = useDispatch();
  const [applications, setApplications] = useState<Applications>([]);

  const sortApplications = (applications: Applications): Applications => {
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
      .sort((a, b) => {
        return a.company.localeCompare(b.company);
      })
      .sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status));

    return sortedList;
  };

  const fetchData = useCallback(async () => {
    try {
      const dbApplications = await getApplications();
      const sortedList = sortApplications(dbApplications);
      setApplications(sortedList);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const openApplication = ({ company, id }: Application) => {
    dispatch(addJobTabs({ label: company || "Job", value: id }));
    dispatch(setActiveTab(id));
  };

  const remove = async (applicationId: string) => {
    try {
      await deleteApplication(applicationId);
      fetchData();
      dispatch(removeJobTab(applicationId));
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusColor = (status: Application["status"]) => {
    if (!status) return "";
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div>
        {showTabs && (
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
        <div className="page">
          <div className="flex justify-between">
            <div className="flex">
              <ExportCSV applications={applications} />
              {getFlag("FULL_EXPORT_FEATURE") && (
                <ImportCSV fetchData={fetchData} />
              )}
            </div>
            <NewJobModal />
          </div>
          <div>
            {applications.map((application) => (
              <div
                className="flex justify-between border-b-1 border-zinc-300"
                key={application.id}
              >
                <button
                  className="hover:bg-indigo-100 hover:cursor-pointer"
                  onClick={() => openApplication(application)}
                >
                  <div className="text-l flex justify-between items-center">
                    <div className="w-30 text-left font-bold my-3 mx-1">
                      {application.company}
                    </div>
                    <div className="w-75 text-left my-3 mx-1">
                      {application.title}
                    </div>
                    <div className="w-30 text-right my-3 mx-1">
                      <p
                        className={`font-bold ${getStatusColor(
                          application.status
                        )}`}
                      >
                        {getStatus(application.status)?.label || ""}
                      </p>
                    </div>
                    <div className="w-15 text-right my-3 mx-1">
                      {getFormattedDate(application.dateApplied || "")}
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  className="rounded-md align-sub text-red-600 m-1 p-1 hover:bg-red-100 hover:cursor-pointer"
                  onClick={() => remove(application.id)}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplicationsList;
