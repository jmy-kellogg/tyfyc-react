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
        {(active == "resume" || !smallDisplay) && (
          <Resume smallDisplay={smallDisplay} />
        )}
        {(active == "applications" || !smallDisplay) && (
          <Applications smallDisplay={smallDisplay} setActive={setActive} />
        )}
        {/* ToDo: cleanup and simplify navigation */}
        {smallDisplay &&
          openTabs.map((jobId) => {
            const application = applications.find((job) => job.jobId === jobId);
            if (application) {
              return (
                active === jobId && (
                  <JobPosting key={jobId} application={application} />
                )
              );
            }
          })}

        {!smallDisplay && (
          <div>
            <Tabs tabs={tabs} active={active} setActive={setActive} />
            {openTabs.map((jobId) => {
              const application = applications.find(
                (job) => job.jobId === jobId
              );
              if (application) {
                return (
                  active === jobId && (
                    <JobPosting key={jobId} application={application} />
                  )
                );
              }
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
