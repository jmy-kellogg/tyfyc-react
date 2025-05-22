import { useSelector, useDispatch } from "react-redux";

import ApplicationDetails from "./ApplicationDetails";
import Profile from "./Profile";
import Resumes from "./Resumes";
import ApplicationsList from "./ApplicationsList";
import Tabs from "@/components/Tabs";

import { setActiveTab, getActiveTab } from "@/store/reducers/navigationSlice";
import type { State } from "@/store";

function LargeDisplayView() {
  const dispatch = useDispatch();
  const activeTab = useSelector(getActiveTab);
  const showProfile = useSelector(
    (state: State) => state.navigation.showProfile
  );
  const showResume = useSelector((state: State) => state.navigation.showResume);
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
