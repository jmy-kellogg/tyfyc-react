import React, { MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";
import { setActiveTab } from "src/store/reducers/navigationSlice";
import type { State } from "src/store";
interface JobTabsBtnProps {
  activeTab: string;
  openMenu: boolean;
}

const JobTabsBtn: React.FC<JobTabsBtnProps> = ({ activeTab, openMenu }) => {
  const dispatch = useDispatch<Dispatch>();
  const jobTabs = useSelector((state: State) => state.navigation.jobTabs);
  const toggleJob = (jobId: string): void => {
    dispatch(setActiveTab(jobId));
  };

  return (
    <>
      {jobTabs.map(({ label, value }) => (
        <button
          key={value}
          className="flex my-2 hover:cursor-pointer hover:text-indigo-400 hover:font-bold"
          onClick={(e: MouseEvent<HTMLButtonElement>): void => {
            e.stopPropagation();
            toggleJob(value);
          }}
        >
          <span
            className={`w-6 text-xl font-bold border rounded-md hover:text-2xl ${
              value === activeTab
                ? "text-white bg-slate-800 hover:bg-indigo-400"
                : "hover:text-indigo-400 hover:bg-indigo-100"
            }`}
          >
            {label[0].toLocaleUpperCase()}
          </span>
          {openMenu && (
            <div
              className={`${activeTab === value ? "font-bold" : ""} mx-2 content-center w-max`}
            >
              {label}
            </div>
          )}
        </button>
      ))}
    </>
  );
};

export default JobTabsBtn;
