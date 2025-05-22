import { useSelector, useDispatch } from "react-redux";

import ApplicationDetails from "./ApplicationDetails";
import Profile from "./Profile";
import Resumes from "./Resumes";
import ApplicationsList from "./ApplicationsList";
import Tabs from "@/components/Tabs";

import {
  setActiveTab,
  getTabs,
  getActiveTab,
} from "@/store/reducers/navigationSlice";

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
        {activeTab === "resume" && <Resumes />}
        {activeTab === "applications" && <ApplicationsList />}
        {!["profile", "resume", "applications", ""].includes(activeTab) && (
          <ApplicationDetails />
        )}
      </div>
    </>
  );
}

export default SmallDisplayView;
