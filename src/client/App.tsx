import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import JobPosting from "./components/jobPosting/Index";
import Resume from "./components/resume/Index";
import Applications from "./components/Applications";
import Tabs from "./components/Tabs";
import SideMenu from "./components/SideMenu";
import { setSmallDisplay } from "./store/reducers/settingsSlice";

import type { TabsList, State } from "../types";

function App() {
  const dispatch = useDispatch();
  const [active, setActive] = useState<string>("resume");
  const [tabs, setTabs] = useState<TabsList>([]);
  const openTabs = useSelector((state: State) => state.applications.openTabs);
  const applications = useSelector((state: State) => state.applications.list);
  const smallDisplay = useSelector(
    (state: State) => state.settings.smallDisplay
  );

  const updateScreenSize = () => {
    const isSmallDisplay = window.innerWidth < 1200;
    dispatch(setSmallDisplay(isSmallDisplay));
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
      if (!openTabs.includes(active)) {
        setActive(openTabs[0]);
      }
    }
  }, [openTabs, applications, smallDisplay]);

  return (
    <>
      {smallDisplay && (
        <Tabs tabs={tabs} active={active} setActive={setActive} />
      )}
      <div className="flex">
        <SideMenu />
        {(active == "resume" || !smallDisplay) && <Resume />}
        {(active == "applications" || !smallDisplay) && <Applications />}
        <JobPosting />
      </div>
    </>
  );
}

export default App;
