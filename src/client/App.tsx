import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import JobPosting from "./components/jobPosting/Index";
import Resume from "./components/resume/Index";
import Applications from "./components/Applications";
import Tabs from "./components/Tabs";

import type { TabsList, State, ApplicationsList } from "../types";

function App() {
  const [active, setActive] = useState<string>("resume");
  const [tabs, setTabs] = useState<TabsList>([]);
  const [smallDisplay, setSmallDisplay] = useState<boolean>(false);
  const openTabs: Array<string> = useSelector(
    (state: State) => state.applications.openTabs
  );
  const applications: ApplicationsList = useSelector(
    (state: State) => state.applications.list
  );

  const updateScreenSize = () => {
    const isSmallDisplay = window.innerWidth < 1200;
    setSmallDisplay(isSmallDisplay);
  };

  useEffect(() => {
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  });

  useEffect(() => {
    const staticTabs: TabsList = [
      { label: "Resume", value: "resume" },
      { label: "Applications", value: "applications" },
    ];
    const dynamicTabs: TabsList = openTabs.map((jobId) => {
      const application = applications.find((job) => job.jobId === jobId);
      const company = application?.company || "Job";
      return {
        label: company,
        value: jobId,
      };
    });

    setTabs([...staticTabs, ...dynamicTabs]);
  }, [openTabs, applications]);

  return (
    <>
      {smallDisplay && (
        <Tabs tabs={tabs} active={active} setActive={setActive} />
      )}
      <div className="flex">
        {(active == "resume" || !smallDisplay) && (
          <Resume smallDisplay={smallDisplay} />
        )}
        {(active == "applications" || !smallDisplay) && (
          <Applications smallDisplay={smallDisplay} setActive={setActive} />
        )}
        {openTabs.map((jobId) => {
          const application = applications.find((job) => job.jobId === jobId);
          if (application) {
            return (
              active === jobId && (
                <JobPosting
                  key={jobId}
                  smallDisplay={smallDisplay}
                  application={application}
                />
              )
            );
          }
        })}
      </div>
    </>
  );
}

export default App;
