import { useState, useEffect } from "react";

import ManualForm from "./components/ManualForm";

function App() {
  const [view, setView] = useState("form");
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
        </div>
      )}
      <div className="flex">
        {(view == "form" || !smallDisplay) && <ManualForm />}
        {(view == "preview" || !smallDisplay) && <h1>DoC</h1>}
      </div>
    </>
  );
}

export default App;
