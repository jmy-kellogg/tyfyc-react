import { useSelector, useDispatch } from "react-redux";

import ApplicationDetails from "./ApplicationDetails";
import Profile from "./Profile";
import Resume from "./Resume";
import ApplicationsList from "./ApplicationsList";
import Tabs from "@/components/Tabs";

import { setActiveTab, getActiveTab } from "@/store/reducers/settingsSlice";
import type { State } from "@/store";

function LargeDisplayView() {
  const dispatch = useDispatch();
  const activeTab = useSelector(getActiveTab);
  const showProfile = useSelector((state: State) => state.settings.showProfile);
  const showResume = useSelector((state: State) => state.settings.showResume);
  const jobTabs = useSelector((state: State) => state.settings.jobTabs);
  const showApplications = useSelector(
    (state: State) => state.settings.showApplications
  );

  const setActive = (activeValue: string) => {
    dispatch(setActiveTab(activeValue));
  };

  return (
    <>
      <div className="flex gap-4">
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
            <Resume />
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
