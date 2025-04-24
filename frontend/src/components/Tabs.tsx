import { useDispatch } from "react-redux";

import {
  removeJobTab,
  setShowResume,
  setShowProfile,
  setShowApplications,
} from "src/store/reducers/navigationSlice";
import type { TabsList } from "@/types";

interface Props {
  tabs: TabsList;
  active: string;
  setActive?: (tabValue: string) => void;
  clearable?: boolean;
}

function Tabs({ tabs, active, setActive, clearable = true }: Props) {
  const dispatch = useDispatch();

  const removeTab = async (value: string) => {
    if (value === "profile") {
      dispatch(setShowProfile(false));
    } else if (value === "resume") {
      dispatch(setShowResume(false));
    } else if (value === "applications") {
      dispatch(setShowApplications(false));
    } else {
      dispatch(removeJobTab(value));
    }
  };

  return (
    <>
      <div className="flex full-page overflow-auto">
        {tabs.map(({ label, value }) => (
          <div
            key={value}
            className={`flex p-2 rounded-t-lg ${
              active == value
                ? " font-bold bg-white mb-0"
                : "border-zinc-300 hover:border-2 hover:border-b-0"
            }`}
          >
            <button
              className={`m-1 mb-2 flex align-sub text-sm w-full max-w-30 hover:font-bold hover:max-w-100 ${
                active !== value ? "hover:cursor-pointer" : ""
              }`}
              onClick={() => setActive && setActive(value)}
            >
              {value === "profile" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
              {value === "resume" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
              )}
              {value === "applications" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              )}

              <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                {label}
              </p>
            </button>

            {clearable && (
              <button
                className="ml-1 mt-1 self-start rounded-lg text-gray-500 hover:cursor-pointer hover:font-bold hover:bg-gray-200"
                onClick={() => removeTab(value)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Tabs;
