import { CSVLink } from "react-csv";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import JobEdit from "./JobEdit";
import JobDoc from "./JobDoc";
import type { State, Application, ApplicationsList } from "../../../types";

interface Props {
  smallDisplay: boolean;
  application: Application;
}

type CsvRow = Array<string>;
type CsvData = Array<CsvRow>;

function JobPosting({ smallDisplay, application }: Props) {
  const [showForm, setShowForm] = useState<boolean>(!application.company);
  const [data, setData] = useState<CsvData>([]);
  const applications: ApplicationsList = useSelector(
    (state: State) => state.applications.list
  );

  useEffect(() => {
    const headers: CsvRow = Object.keys(applications[0]);
    const values: CsvData = applications.map(
      (app: Application): CsvRow => Object.values(app)
    );
    setData([headers, ...values]);
  }, [applications]);
  return (
    <>
      <div className="mx-5 w-full max-w-3xl">
        {!smallDisplay && <h2 className="text-center">Job Posting</h2>}

        <div className="float-right m-5">
          {!showForm && (
            <CSVLink
              className="rounded-md border-2 border-indigo-600 mx-3 p-3 text-sm font-semibold text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
              data={data}
              filename={`tyfyc_job_search.csv`}
              target="_blank"
            >
              Save Application Details
            </CSVLink>
          )}
          <button
            className="rounded-md bg-indigo-600 mx-3 p-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 hover:cursor-pointer"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Preview" : "Edit"}
          </button>
        </div>
        <div className="bg-white p-5">
          {showForm ? (
            <JobEdit application={application} />
          ) : (
            <JobDoc application={application} />
          )}
        </div>
      </div>
    </>
  );
}

export default JobPosting;
