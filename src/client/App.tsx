import { useState, useEffect } from "react";

import JobPosting from "./components/JobPosting";
import Resume from "./components/resume";

function App() {
  const [view, setView] = useState("resume");
  const [smallDisplay, setSmallDisplay] = useState(false);

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

  return (
    <>
      {smallDisplay && (
        <div className="flex">
          <button
            className={`m-1 ml-0 w-24 rounded-t-lg p-3 hover:cursor-pointer hover:font-bold${
              view == "resume" ? " font-bold bg-white mb-0" : ""
            }`}
            onClick={() => setView("resume")}
          >
            Resume
          </button>
          <button
            className={`m-1 ml-0 w-24 rounded-t-lg p-3 hover:cursor-pointer hover:font-bold${
              view == "job" ? " font-bold bg-white mb-0" : ""
            }`}
            onClick={() => setView("job")}
          >
            Job
          </button>
        </div>
      )}
      <div className="flex">
        {(view == "resume" || !smallDisplay) && (
          <Resume smallDisplay={smallDisplay} />
        )}
        {(view == "job" || !smallDisplay) && (
          <JobPosting smallDisplay={smallDisplay} />
        )}
      </div>
    </>
  );
}

export default App;
