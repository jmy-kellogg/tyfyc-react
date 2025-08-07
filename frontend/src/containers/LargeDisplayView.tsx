import { useSelector, useDispatch } from "react-redux";

import ApplicationDetails from "./ApplicationDetails";
import Profile from "./Profile";
import Resumes from "./Resumes";
import Stats from "./Stats";
import ApplicationsList from "./ApplicationsList";
import Settings from "./Settings";
import Tabs from "@/components/Tabs";

import { setActiveTab, getActiveTab } from "@/store/reducers/navigationSlice";
import type { State } from "@/store";

function LargeDisplayView() {
  const dispatch = useDispatch();
  const activeTab = useSelector(getActiveTab);
  const showSettings = useSelector(
    (state: State) => state.navigation.showSettings
  );
  const showProfile = useSelector(
    (state: State) => state.navigation.showProfile
  );
  const showResume = useSelector((state: State) => state.navigation.showResume);
  const showStats = useSelector((state: State) => state.navigation.showStats);
  const jobTabs = useSelector((state: State) => state.navigation.jobTabs);
  const showApplications = useSelector(
    (state: State) => state.navigation.showApplications
  );

  const setActive = (activeValue: string) => {
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
}

export default LargeDisplayView;
