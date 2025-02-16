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
      <div className="bg-white w-12 h-screen p-3">
        {smallDisplay ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 my-3 hover:cursor-pointer hover:size-7 hover:text-blue-400"
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
            className="size-6 my-3 hover:cursor-pointer hover:size-7 hover:text-blue-400"
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
          fill={showResume ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={showResume ? "white" : "currentColor"}
          className="size-6 my-3 hover:cursor-pointer hover:size-7 hover:text-blue-400"
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
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 my-3 hover:cursor-pointer hover:size-7 hover:text-blue-400"
            onClick={toggleApplication}
          >
            <path
              fillRule="evenodd"
              d="M5.478 5.559A1.5 1.5 0 0 1 6.912 4.5H9A.75.75 0 0 0 9 3H6.912a3 3 0 0 0-2.868 2.118l-2.411 7.838a3 3 0 0 0-.133.882V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0 0 17.088 3H15a.75.75 0 0 0 0 1.5h2.088a1.5 1.5 0 0 1 1.434 1.059l2.213 7.191H17.89a3 3 0 0 0-2.684 1.658l-.256.513a1.5 1.5 0 0 1-1.342.829h-3.218a1.5 1.5 0 0 1-1.342-.83l-.256-.512a3 3 0 0 0-2.684-1.658H3.265l2.213-7.191Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M12 2.25a.75.75 0 0 1 .75.75v6.44l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.06l1.72 1.72V3a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 my-3 hover:cursor-pointer hover:size-7 hover:text-blue-400"
            onClick={toggleApplication}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
            />
          </svg>
        )}
        {jobTabs.map(({ label, value }) => (
          <button
            key={value}
            className={`text-xl font-bold p-1 my-1 border rounded-md hover:text-2xl hover:text-blue-400 hover:bg-blue-100 ${
              value === activeTab ? "text-white bg-black" : ""
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
