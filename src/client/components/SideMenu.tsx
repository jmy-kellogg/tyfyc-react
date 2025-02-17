import { useSelector, useDispatch } from "react-redux";
import {
  setShowResume,
  setShowApplications,
  setTabs,
  setActiveTab,
  setSmallDisplay,
} from "../store/reducers/settingsSlice";

import type { State } from "../../types";

function SideMenu() {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: State) => state.settings.activeTab);
  const showResume = useSelector((state: State) => state.settings.showResume);
  const jobTabs = useSelector((state: State) => state.settings.jobTabs);
  const smallDisplay = useSelector(
    (state: State) => state.settings.smallDisplay
  );
  const showApplications = useSelector(
    (state: State) => state.settings.showApplications
  );
  const toggleResume = () => {
    dispatch(setShowResume(!showResume));
    dispatch(setTabs());
  };

  const toggleApplication = () => {
    dispatch(setShowApplications(!showApplications));
    dispatch(setTabs());
  };

  const toggleJob = (jobId: string) => {
    dispatch(setActiveTab(jobId));
  };

  const toggleDisplay = () => {
    dispatch(setSmallDisplay(!smallDisplay));
  };

  return (
    <>
      <div className="bg-white text-slate-800 w-12 h-screen p-3">
        {smallDisplay ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 my-3 hover:cursor-pointer hover:size-7 hover:text-indigo-400"
            onClick={toggleDisplay}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 my-3 hover:cursor-pointer hover:size-7 hover:text-indigo-400"
            onClick={toggleDisplay}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 13.5H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            />
          </svg>
        )}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={showResume ? "none" : "currentColor"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={showResume ? "currentColor" : "white"}
          className="size-6 my-3 hover:cursor-pointer hover:size-7 hover:text-indigo-400"
          onClick={toggleResume}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>

        {showApplications ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 my-3 hover:cursor-pointer hover:size-7 hover:text-indigo-400"
            onClick={toggleApplication}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 my-3 hover:cursor-pointer hover:size-7 hover:text-indigo-400"
            onClick={toggleApplication}
          >
            <path
              fillRule="evenodd"
              d="M1.5 9.832v1.793c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875V9.832a3 3 0 0 0-.722-1.952l-3.285-3.832A3 3 0 0 0 16.215 3h-8.43a3 3 0 0 0-2.278 1.048L2.222 7.88A3 3 0 0 0 1.5 9.832ZM7.785 4.5a1.5 1.5 0 0 0-1.139.524L3.881 8.25h3.165a3 3 0 0 1 2.496 1.336l.164.246a1.5 1.5 0 0 0 1.248.668h2.092a1.5 1.5 0 0 0 1.248-.668l.164-.246a3 3 0 0 1 2.496-1.336h3.165l-2.765-3.226a1.5 1.5 0 0 0-1.139-.524h-8.43Z"
              clipRule="evenodd"
            />
            <path d="M2.813 15c-.725 0-1.313.588-1.313 1.313V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-1.688c0-.724-.588-1.312-1.313-1.312h-4.233a3 3 0 0 0-2.496 1.336l-.164.246a1.5 1.5 0 0 1-1.248.668h-2.092a1.5 1.5 0 0 1-1.248-.668l-.164-.246A3 3 0 0 0 7.046 15H2.812Z" />
          </svg>
        )}
        {jobTabs.map(({ label, value }) => (
          <button
            key={value}
            className={`text-xl font-bold p-1 my-1 border rounded-md hover:text-2xl hover:text-indigo-400 hover:bg-indigo-100 ${
              value === activeTab ? "text-white bg-slate-800" : ""
            }`}
            onClick={() => {
              toggleJob(value);
            }}
          >
            {label[0].toLocaleUpperCase()}
          </button>
        ))}
      </div>
    </>
  );
}

export default SideMenu;
