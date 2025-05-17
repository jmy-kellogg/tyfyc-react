import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";

import type { Application, Applications } from "@/types";
import type { State } from "@/store";

type HeaderRow = Array<keyof Application>;
type CsvRow = Array<Application[keyof Application]>;
type CsvData = Array<CsvRow>;

interface Props {
  applications: Applications;
}

function ExportCSV({ applications }: Props) {
  const flags = useSelector((state: State) => state.auth.flags);
  const [data, setData] = useState<CsvData>([]);

  useEffect(() => {
    const fullHeaders: HeaderRow = [
      "company",
      "title",
      "status",
      "dateApplied",
      "location",
      "salary",
      "postingLink",
      "companySite",
      "id",
      "posting",
    ];
    const partialHeaders: HeaderRow = [
      "company",
      "title",
      "location",
      "dateApplied",
      "status",
      "salary",
      "postingLink",
      "companySite",
    ];

    const headers: HeaderRow = flags.includes("FULL_EXPORT_FEATURE")
      ? fullHeaders
      : partialHeaders;

    const values: CsvData = applications.map((app) =>
      headers.map((key) => app[key] || "")
    );

    setData([headers, ...values]);
  }, [applications, flags]);

  return (
    <>
      <button className="rounded-md border-2 border-indigo-600 font-semibold text-indigo-600 shadow-md m-3 p-2 hover:cursor-pointer hover:bg-indigo-500 hover:text-white">
        <CSVLink data={data} filename={`tyfyc_job_search.csv`} target="_blank">
          {flags.includes("FULL_EXPORT_FEATURE")
            ? "Export full CSV"
            : "Export CSV"}
        </CSVLink>
      </button>
    </>
  );
}

export default ExportCSV;
