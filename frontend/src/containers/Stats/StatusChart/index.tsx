import { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

import RenderOuter from "./RenderOuter";
import RenderInner from "./RenderInner";
import { statusOptions } from "@options";
import { getApplications } from "src/api/applications";

interface StatusData {
  name: string;
  value: number;
  color: string;
  percent: number;
}

function StatusChart() {
  const [totalApplied, setTotalApplied] = useState(0);
  const [innerData, setInnerData] = useState<StatusData[]>([]);
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

      const data = statusOptions
        .map(({ id, label, color }): StatusData => {
          return {
            name: label,
            value: statusDict[id],
            color: color,
            percent: statusDict[id] ? statusDict[id] / total : 0,
          };
        })
        .filter(({ value }) => !!value);

      const interviewedTotal =
        statusDict.interviewing +
        statusDict.accepted +
        statusDict.no_offer +
        statusDict.declined +
        statusDict.rejected;
      const no_response = statusDict.auto_rejected + statusDict.no_response;
      const pending = statusDict.applied + statusDict.pending;
      const innerData = [
        {
          name: "Got Interview",
          value: interviewedTotal,
          color: "oklch(0.696 0.17 162.48)",
          percent: interviewedTotal ? interviewedTotal / total : 0,
        },
        {
          name: "No Response",
          value: no_response,
          color: "oklch(0.551 0.027 264.364)",
          percent: no_response ? no_response / total : 0,
        },
        {
          name: "Pending",
          value: pending,
          color: "oklch(0.702 0.183 293.541)",
          percent: pending ? pending / total : 0,
        },
      ];

      setStatusData(data);
      setInnerData(innerData);
      setTotalApplied(total);
    };

    fetchData();
  }, []);

  return (
    <>
      <PieChart width={600} height={400}>
        <text x="50%" y="50%" dy={8} textAnchor="middle" fill="black">
          {totalApplied}
        </text>
        <Pie
          data={innerData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={RenderInner}
          outerRadius={80}
          innerRadius={20}
          dataKey="value"
        >
          {innerData.map((entry) => (
            <Cell key={`cell-${entry.name}`} fill={entry.color} />
          ))}
        </Pie>
        <Pie
          data={statusData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={80}
          dataKey="value"
          label={RenderOuter}
        >
          {statusData.map((entry) => (
            <Cell key={`cell-${entry.name}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </>
  );
}

export default StatusChart;
