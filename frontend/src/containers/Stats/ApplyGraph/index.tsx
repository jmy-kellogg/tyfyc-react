import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import { getApplications } from "src/api/applications";
import { getFormattedDate } from "@utils";

interface applyData {
  name: string;
  count: number;
}

const ApplyChart: React.FC = () => {
  const [data, setData] = useState<applyData[]>([]);

  useEffect((): void => {
    const fetchData = async () => {
      const applications = await getApplications();
      const applyCount: { [key: string]: number } = {};
      applications.forEach(({ dateApplied }) => {
        if (dateApplied in applyCount) {
          applyCount[dateApplied] = applyCount[dateApplied] + 1;
        } else {
          applyCount[dateApplied] = 1;
        }
      });
      const appData = Object.entries(applyCount).map(([date, count]) => {
        return {
          name: getFormattedDate(date),
          count,
        };
      });
      setData(appData);
    };
    fetchData();
  }, []);

  return (
    <div className="m-2 p-4 w-max border border-gray-200 shadow-md rounded-md">
      <h3 className="mb-2 ml-5">Apply Timeline</h3>

      <BarChart
        width={1300}
        height={160}
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" stackId="a" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default ApplyChart;
