import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";

import ApplicationDetails from "./ApplicationDetails";
import Profile from "./Profile";
import Resumes from "./Resumes";
import Stats from "./Stats";
import ApplicationsList from "./ApplicationsList";
import Settings from "./Settings";
import Tabs from "@/components/Tabs";

import { setActiveTab, getActiveTab } from "@/store/reducers/navigationSlice";
import type { State } from "@/store";

const LargeDisplayView: React.FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const activeTab: string = useSelector(getActiveTab);
  const showSettings: boolean = useSelector(
    (state: State) => state.navigation.showSettings
  );
  const showProfile: boolean = useSelector(
    (state: State) => state.navigation.showProfile
  );
  const showResume: boolean = useSelector(
    (state: State) => state.navigation.showResume
  );
  const showStats: boolean = useSelector(
    (state: State) => state.navigation.showStats
  );
  const jobTabs = useSelector((state: State) => state.navigation.jobTabs);
  const showApplications: boolean = useSelector(
    (state: State) => state.navigation.showApplications
  );
  const showJobBoards: boolean = useSelector(
    (state: State) => state.navigation.showJobBoards
  );

  const setActive = (activeValue: string): void => {
    dispatch(setActiveTab(activeValue));
  };

  return (
    <>
      <div className="flex gap-4">
        {showSettings && (
          <div className="w-4xl">
            <Tabs
              tabs={[
                {
                  label: "Settings",
                  value: "settings",
                },
              ]}
              active="settings"
            />
            <Settings />
          </div>
        )}
        {showProfile && (
          <div className="w-4xl">
            <Tabs
              tabs={[
                {
                  label: "Profile",
                  value: "profile",
                },
              ]}
              active="profile"
            />
            <Profile />
          </div>
        )}
        {showResume && (
          <div className="w-4xl">
            <Tabs
              tabs={[
                {
                  label: "Resume",
                  value: "resume",
                },
              ]}
              active="resume"
            />
            <Resumes />
          </div>
        )}
        {showStats && (
          <div className="w-4xl">
            <Tabs
              tabs={[
                {
                  label: "Stats",
                  value: "stats",
                },
              ]}
              active="stats"
            />
            <Stats />
          </div>
        )}
        {showJobBoards && (
          <div className="w-4xl">
            <Tabs
              tabs={[
                {
                  label: "Job Boards",
                  value: "jobBoards",
                },
              ]}
              active="jobBoards"
            />
            <Stats />
          </div>
        )}
        {showApplications && (
          <div className="w-3xl">
            <Tabs
              tabs={[
                {
                  label: "Applications",
                  value: "applications",
                },
              ]}
              active="applications"
            />
            <ApplicationsList />
          </div>
        )}
        {!!jobTabs.length && (
          <div className="w-4xl">
            <Tabs
              tabs={jobTabs || []}
              active={activeTab}
              setActive={setActive}
            />

            <ApplicationDetails />
          </div>
        )}
      </div>
    </>
  );
};

export default LargeDisplayView;
