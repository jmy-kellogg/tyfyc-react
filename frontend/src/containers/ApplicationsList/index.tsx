import { useState, useEffect, useCallback, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getStatus, getFormattedDate } from "@utils";
import { getApplications, deleteApplication } from "src/api/applications";
import ExportCSV from "./ExportCSV";
import ImportCSV from "./ImportCSV";
import NewJobModal from "./NewJobModal";

import {
  setActiveTab,
  addJobTabs,
  removeJobTab,
} from "src/store/reducers/navigationSlice";
import type { Application, Applications } from "@/types";
import type { State } from "@/store";
import DeleteBtn from "@/components/DeleteBtn";

function ApplicationsList() {
  const dispatch = useDispatch();
  const flags = useSelector((state: State) => state.auth.flags);
  const [applications, setApplications] = useState<Applications>([]);
  const [filteredList, setFilteredList] = useState<Applications>([]);
  const [search, setSearch] = useState("");

  const sortApplications = (applications: Applications): Applications => {
    const order = [
      "interviewing",
      "applied",
      "pending",
      "accepted",
      "declined",
      "no_offer",
      "rejected",
      "auto_rejected",
      "no_response",
    ];
    const sortedList = [...applications]
      .sort((a, b) => {
        const aDate = new Date(a.dateApplied).getTime();
        const bDate = new Date(b.dateApplied).getTime();
        return bDate - aDate;
      })
      .sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status));

    return sortedList;
  };

  const openApplication = ({ company, id }: Application) => {
    dispatch(addJobTabs({ label: company || "Job", value: id }));
    dispatch(setActiveTab(id));
  };

  const remove = async (applicationId: string) => {
    await deleteApplication(applicationId);
    fetchData();
    dispatch(removeJobTab(applicationId));
  };

  const getStatusColor = (status: Application["status"]) => {
    if (!status) return "";
    const colorMap = {
      applied: "text-blue-400",
      interviewing: "text-emerald-400",
      accepted: "text-emerald-600",
      no_offer: "text-amber-500",
      rejected: "text-amber-400",
      declined: "text-rose-400",
      auto_rejected: "text-gray-600",
      no_response: "text-gray-400",
      pending: "text-purple-400",
    };
    return colorMap[status];
  };
  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (!e.target.value) {
      setFilteredList(applications);
    } else {
      setFilteredList(
        applications.filter(({ company }) =>
          company.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };

  const clearSearch = () => {
    setSearch("");
    setFilteredList(applications);
  };

  const fetchData = useCallback(async () => {
    const dbApplications = await getApplications();
    const sortedList = sortApplications(dbApplications);
    setApplications(sortedList);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setFilteredList(applications);
  }, [applications]);

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
              onChange={handleFilter}
            />
            <button
              className="m-auto p-1 mx-2 self-start rounded-lg text-gray-500 hover:cursor-pointer hover:font-bold hover:bg-gray-200"
              onClick={clearSearch}
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
            <div className="flex">
              <ExportCSV applications={applications} />
              {flags.includes("FULL_EXPORT_FEATURE") && (
                <ImportCSV fetchData={fetchData} />
              )}
            </div>
            <NewJobModal />
          </div>
          <div>
            {filteredList.map((application) => (
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
                <DeleteBtn
                  application={application}
                  onRemove={() => remove(application.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplicationsList;
