import React from "react";
import StatusChart from "./StatusChart";
import ApplyChart from "./ApplyGraph";

const Stats: React.FC = () => {
  return (
    <div className="page">
      <h1>Stats</h1>
      <ApplyChart />
      <StatusChart />
    </div>
  );
};

export default Stats;
