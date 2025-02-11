import { useState, useEffect } from "react";

import ManualForm from "./components/ManualForm";
import FormattedDoc from "./components/FormattedDoc";
import JobPosting from "./components/JobPosting";

function App() {
  const [view, setView] = useState("job");
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
              view == "form" ? " font-bold bg-white mb-0" : ""
            }`}
            onClick={() => setView("form")}
          >
            Input
          </button>
          <button
            className={`m-1 ml-0 w-24 rounded-t-lg p-3 hover:cursor-pointer hover:font-bold${
              view == "preview" ? " font-bold bg-white mb-0" : ""
            }`}
            onClick={() => setView("preview")}
          >
            Preview
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
        {(view == "form" || !smallDisplay) && <ManualForm />}
        {(view == "preview" || !smallDisplay) && <FormattedDoc />}
        {(view == "job" || !smallDisplay) && <JobPosting />}
      </div>
    </>
  );
}

export default App;
