import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const getGreeting = async function () {
  const res = await fetch("/api/test");
  return await res.json();
};

function App() {
  const [count, setCount] = useState(0);
  const [greeting, setGreeting] = useState(""); // Add this

  useEffect(() => {
    // Add this hook
    getGreeting().then((res) => setGreeting(res.greeting));
  }, []);

  return (
    <>
      <div>
        <p>Server response: {greeting}</p>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
