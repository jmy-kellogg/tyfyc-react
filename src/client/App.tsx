import { useState, useEffect } from "react";

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

  // ToDo: remove example function
  // const [greeting, setGreeting] = useState("");
  // const getGreeting = async function () {
  //   const res = await fetch("/api/test");
  //   return await res.json();
  // };
  // useEffect(() => {
  //   // Add this hook
  //   getGreeting().then((res) => setGreeting(res.greeting));
  // }, []);

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
        <h1>Form</h1>
        <h1>DoC</h1>
      </div>
    </>
  );
}

export default App;
