import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  ChangeEvent,
} from "react";
import { useDispatch } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";

import ExportCSV from "./ExportCSV";
import ImportCSV from "./ImportCSV";
import {
  getApplications,
  deleteApplication,
  updateApplication,
} from "src/api/applications";
import Dropdown from "@/components/DropDown";
import { getFormattedDate } from "@utils";
import { statusOptions } from "@options";
import {
  setActiveTab,
  addJobTabs,
  removeJobTab,
} from "src/store/reducers/navigationSlice";

import type { Application, Applications } from "@/types";
import DeleteBtn from "@/components/DeleteBtn";
import { useAuthContext } from "@/context/AuthContext";

const order = [
  "accepted",
  "interviewing",
  "offer",
  "pending",
  "applied",
  "declined",
  "no_offer",
  "rejected",
  "auto_rejected",
  "no_response",
];

const sortApplications = (applications: Applications): Applications => {
  const sortedList = [...applications]
    .sort((a, b) => {
      const aDate = new Date(a.dateApplied).getTime();
      const bDate = new Date(b.dateApplied).getTime();
      return bDate - aDate;
    })
    .sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status));

  return sortedList;
};

const ApplicationsList: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const { flags } = useAuthContext();
  const [applications, setApplications] = useState<Applications>([]);
  const [search, setSearch] = useState<string>("");
  const filteredList: Applications = useMemo((): Applications => {
    return search
      ? applications.filter(({ company }) =>
          company.toLowerCase().includes(search.toLowerCase())
        )
      : applications;
  }, [applications, search]);

  const openApplication = ({ company, id }: Application): void => {
    dispatch(addJobTabs({ label: company || "Job", value: id }));
    dispatch(setActiveTab(id));
  };

  const remove = async (applicationId: string): Promise<void> => {
    await deleteApplication(applicationId);
    fetchData();
    dispatch(removeJobTab(applicationId));
  };

  const fetchData = useCallback(async (): Promise<void> => {
    const dbApplications = await getApplications();
    const sortedList = sortApplications(dbApplications);

    setApplications(sortedList);
  }, [setApplications]);

  useEffect((): void => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="page">
        <div className="max-w-max justify-self-center">
          <div className="flex bg-white outline-1 -outline-offset-1 outline-gray-300 rounded-lg bg-gray-100">
            <input
              id="search"
              name="search"
              type="text"
              placeholder="Search Companies"
              className="py-2 px-4 place-content-between w-2xl text-base placeholder:text-gray-400 rounded-lg focus:outline-none"
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                setSearch(e.target.value)
              }
            />
            <button
              className="m-auto p-1 mx-2 self-start rounded-lg text-gray-500 hover:cursor-pointer hover:font-bold hover:bg-gray-200"
              onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
                e.stopPropagation();
                setSearch("");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
                id="clear-icon"
              >
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </button>
          </div>
          <div className="flex justify-between">
            <ExportCSV applications={applications} />
            {flags.includes("FULL_EXPORT_FEATURE") && (
              <ImportCSV fetchData={fetchData} />
            )}
          </div>
          <div>
            {filteredList.map((application) => (
              <div
                className="flex justify-between border-b-1 border-zinc-300"
                key={application.id}
              >
                <button
                  className="hover:bg-indigo-100 hover:cursor-pointer"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
                    e.stopPropagation();
                    openApplication(application);
                  }}
                >
                  <div className="text-l flex justify-between items-center">
                    <div className="w-30 text-left font-bold my-3 mx-1">
                      {application.company}
                    </div>
                    <div className="w-75 text-left my-3 mx-1">
                      {application.title}
                    </div>
                  </div>
                </button>
                <div className="w-30 text-right my-3 mx-1">
                  <Dropdown
                    inputName="status"
                    inputValue={application.status || ""}
                    options={statusOptions}
                    onUpdate={async (
                      status: Record<string, unknown>
                    ): Promise<void> => {
                      await updateApplication({ ...application, ...status });
                      fetchData();
                    }}
                  />
                </div>
                <div className="w-15 text-right my-3 mx-1">
                  {getFormattedDate(application.dateApplied || "")}
                </div>

                <DeleteBtn
                  application={application}
                  onRemove={(): Promise<void> => remove(application.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationsList;
