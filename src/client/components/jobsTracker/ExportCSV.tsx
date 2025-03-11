import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";

import type { State } from "@store";
import type { Application } from "@types";

type CsvRow = Array<string>;
type CsvData = Array<CsvRow>;

interface Props {
  label?: string;
}

function ExportCSV({ label = "Export CSV" }: Props) {
  const [data, setData] = useState<CsvData>([]);
  const applications = useSelector((state: State) => state.applications);

  useEffect(() => {
    const headers: CsvRow = Object.keys(applications[0] || {});
    const values: CsvData = applications.map(
      (app: Application): CsvRow => Object.values(app)
    );
    setData([headers, ...values]);
  }, [applications]);

  return (
    <>
      <button className="rounded-md border-2 border-indigo-600 font-semibold text-indigo-600 shadow-md m-3 p-2 hover:cursor-pointer hover:bg-indigo-500 hover:text-white">
        <CSVLink data={data} filename={`tyfyc_job_search.csv`} target="_blank">
          {label}
        </CSVLink>
      </button>
    </>
  );
}

export default ExportCSV;
