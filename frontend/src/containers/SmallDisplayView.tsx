import { useSelector, useDispatch } from "react-redux";

import ApplicationDetails from "./ApplicationDetails";
import Profile from "./Profile";
import Resume from "./Resume";
import ApplicationsList from "./ApplicationsList";
import Tabs from "@/components/Tabs";

import {
  setActiveTab,
  getTabs,
  getActiveTab,
} from "@/store/reducers/settingsSlice";

function SmallDisplayView() {
  const dispatch = useDispatch();
  const tabs = useSelector(getTabs);
  const activeTab = useSelector(getActiveTab);

  const setActive = (activeValue: string) => {
    dispatch(setActiveTab(activeValue));
  };

  return (
    <>
      <Tabs tabs={tabs} active={activeTab} setActive={setActive} />
      <div className="full-page">
        {activeTab === "profile" && <Profile />}
        {activeTab === "resume" && <Resume />}
        {activeTab === "applications" && <ApplicationsList />}
        {!["profile", "resume", "applications"].includes(activeTab) && (
          <ApplicationDetails />
        )}
      </div>
    </>
  );
}

export default SmallDisplayView;
