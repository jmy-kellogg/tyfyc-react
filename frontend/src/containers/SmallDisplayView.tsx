import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";

import ApplicationDetails from "./ApplicationDetails";
import Settings from "./Settings";
import Profile from "./Profile";
import Resumes from "./Resumes";
import Stats from "./Stats";
import JobBoards from "./JobBoard";
import ApplicationsList from "./ApplicationsList";
import Tabs from "@/components/Tabs";

import {
  getTabs,
  getActiveTab,
  setActiveTab,
} from "@/store/reducers/navigationSlice";

const SmallDisplayView: React.FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const tabs = useSelector(getTabs);
  const activeTab: string = useSelector(getActiveTab);

  const setActive = (activeValue: string): void => {
    dispatch(setActiveTab(activeValue));
  };

  return (
    <>
      <Tabs tabs={tabs} active={activeTab} setActive={setActive} />
      <div className="full-page">
        {activeTab === "settings" && <Settings />}
        {activeTab === "profile" && <Profile />}
        {activeTab === "resume" && <Resumes />}
        {activeTab === "stats" && <Stats />}
        {activeTab === "jobBoards" && <JobBoards />}
        {activeTab === "applications" && <ApplicationsList />}
        {![
          "settings",
          "profile",
          "resume",
          "applications",
          "stats",
          "jobBoards",
          "",
        ].includes(activeTab) && <ApplicationDetails />}
      </div>
    </>
  );
};

export default SmallDisplayView;
