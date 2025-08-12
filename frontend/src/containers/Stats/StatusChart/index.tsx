import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

import RenderOuter from "./RenderOuter";
import RenderInner from "./RenderInner";
import { statusOptions } from "@options";
import { getApplications } from "src/api/applications";

interface StatusData {
  dataKey: string;
  name: string;
  value: number;
  color: string;
  percent: number;
}

function StatusChart() {
  const [totalApplied, setTotalApplied] = useState(0);
  const [macroData, setMacroData] = useState<StatusData[]>([]);
  const [statusData, setStatusData] = useState<StatusData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const dbApplications = await getApplications();
      let total = 0;
      const statusDict: { [key: string]: number } = statusOptions.reduce(
        (prev, curr) => {
          return {
            ...prev,
            [curr.id]: 0,
          };
        },
        {}
      );

      dbApplications.forEach((application) => {
        if (application.status in statusDict) {
          statusDict[application.status]++;
          total++;
        }
      });

      const interviewed = [
        "interviewing",
        "accepted",
        "no_offer",
        "declined",
        "rejected",
      ];
      const noInterview = ["auto_rejected", "no_response"];
      const active = ["applied", "pending"];

      const interviewedTotal = interviewed.reduce(
        (prev, curr) => prev + statusDict[curr],
        0
      );
      const noInterviewTotal = noInterview.reduce(
        (prev, curr) => prev + statusDict[curr],
        0
      );
      const activeTotal = active.reduce(
        (prev, curr) => prev + statusDict[curr],
        0
      );

      const macro = [
        {
          dataKey: "got_interview",
          name: "Got Interview",
          value: interviewedTotal,
          color: "oklch(0.696 0.17 162.48)",

          percent: interviewedTotal ? interviewedTotal / total : 0,
        },
        {
          dataKey: "no_interview",
          name: "No Interview",
          value: noInterviewTotal,
          color: "oklch(0.551 0.027 264.364)",

          percent: noInterviewTotal ? noInterviewTotal / total : 0,
        },
        {
          dataKey: "currently_pending",
          name: "Active",
          value: activeTotal,
          color: "oklch(0.702 0.183 293.541)",
          percent: activeTotal ? activeTotal / total : 0,
        },
      ];

      const data = statusOptions
        .map(({ id, label, color }): StatusData => {
          return {
            dataKey: id,
            name: label,
            value: statusDict[id],
            color: color,
            percent: statusDict[id] ? statusDict[id] / total : 0,
          };
        })
        .filter(({ value }) => !!value);

      setStatusData(data);
      setMacroData(macro);
      setTotalApplied(total);
    };

    fetchData();
  }, []);

  return (
    <>
      <h3 className="justify-self-center">{totalApplied} Applications</h3>
      <PieChart width={800} height={300}>
        <Legend
          align="left"
          layout="vertical"
          verticalAlign="top"
          wrapperStyle={{ lineHeight: "40px" }}
        />
        <Pie
          data={statusData}
          cx="50%"
          cy="50%"
          labelLine={false}
          activeShape={RenderInner}
          outerRadius={110}
          innerRadius={80}
          legendType="square"
          dataKey="value"
        >
          {statusData.map((entry) => (
            <Cell key={`cell-${entry.dataKey}`} fill={entry.color} />
          ))}
        </Pie>
        <Pie
          data={macroData}
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={120}
          dataKey="value"
          legendType="circle"
          label={RenderOuter}
        >
          {macroData.map((entry) => (
            <Cell key={`cell-${entry.dataKey}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </>
  );
}

export default StatusChart;
