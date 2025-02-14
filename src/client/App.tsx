import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import JobPosting from "./components/jobPosting/Index";
import Resume from "./components/resume/Index";
import Applications from "./components/Applications";
import Tabs from "./components/Tabs";

import type { State } from "../types";

function App() {
  const staticTabs = [
    { label: "Resume", value: "resume" },
    { label: "Applications", value: "applications" },
  ];

  const [active, setActive] = useState("resume");
  const [tabs, setTabs] = useState(staticTabs);
  const [smallDisplay, setSmallDisplay] = useState(false);
  const openTabs = useSelector((state: State) => state.applications.openTabs);
  const applications = useSelector((state: State) => state.applications.list);

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
    const dynamicTabs = openTabs.map((jobId) => {
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
          <Applications smallDisplay={smallDisplay} />
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
