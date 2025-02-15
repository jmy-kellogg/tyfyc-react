import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import JobPosting from "./components/jobPosting/Index";
import Resume from "./components/resume/Index";
import Applications from "./components/Applications";
import Tabs from "./components/Tabs";
import SideMenu from "./components/SideMenu";
import { setSmallDisplay, setActiveTab } from "./store/reducers/settingsSlice";

import type { TabsList, State } from "../types";

function App() {
  const dispatch = useDispatch();
  const [tabs, setTabs] = useState<TabsList>([]);
  const openTabs = useSelector((state: State) => state.applications.openTabs);
  const applications = useSelector((state: State) => state.applications.list);
  const activeTab = useSelector((state: State) => state.settings.activeTab);
  const smallDisplay = useSelector(
    (state: State) => state.settings.smallDisplay
  );

  const updateScreenSize = () => {
    const isSmallDisplay = window.innerWidth < 1200;
    dispatch(setSmallDisplay(isSmallDisplay));
  };

  const setActive = (activeValue: string) => {
    dispatch(setActiveTab(activeValue));
  };

  useEffect(() => {
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  });

  useEffect(() => {
    const dynamicTabs: TabsList = openTabs.map((jobId) => {
      const application = applications.find((job) => job.jobId === jobId);
      const company = application?.company || "Job";
      return {
        label: company,
        value: jobId,
      };
    });
    if (smallDisplay) {
      const staticTabs: TabsList = [
        { label: "Resume", value: "resume" },
        { label: "Applications", value: "applications" },
      ];
      setTabs([...staticTabs, ...dynamicTabs]);
    } else {
      setTabs(dynamicTabs);
      if (!openTabs.includes(activeTab)) {
        setActive(activeTab);
      }
    }
  }, [openTabs, applications, smallDisplay]);

  return (
    <>
      <div className="flex">
        <SideMenu />
        <div className="m-3">
          {smallDisplay && (
            <Tabs tabs={tabs} active={activeTab} setActive={setActive} />
          )}
          <div className="grid grid-flow-col gap-4">
            <Resume />
            <Applications />
            <JobPosting />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
