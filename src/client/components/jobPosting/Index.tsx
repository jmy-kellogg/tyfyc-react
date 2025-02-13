import { CSVLink } from "react-csv";
import { useState } from "react";
import { useSelector } from "react-redux";

import JobEdit from "./JobEdit";
import JobDoc from "./JobDoc";
import type { State, PostingState } from "../../../types";

interface Props {
  smallDisplay: boolean;
}

function JobPosting({ smallDisplay }: Props) {
  const posting: PostingState = useSelector((state: State) => state.posting);
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="mx-5 w-full max-w-3xl">
        {!smallDisplay && <h2 className="text-center">Job Posting</h2>}

        <div className="float-right m-5">
          {!showForm && (
            <CSVLink
              className="rounded-md border-2 border-indigo-600 mx-3 p-3 text-sm font-semibold text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
              data={[Object.keys(posting), Object.values(posting)]}
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
          {showForm ? <JobEdit /> : <JobDoc />}
        </div>
      </div>
    </>
  );
}

export default JobPosting;
