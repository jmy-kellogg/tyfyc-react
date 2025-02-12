import { useSelector } from "react-redux";

import type { State, PostingState } from "../../../types";

function JobDoc() {
  const posting: PostingState = useSelector((state: State) => state.posting);

  return (
    <>
      <div id="job-application-content">
        <h1>{posting.company}</h1>
        <div className="flex">
          <h2>
            {posting.title} - {posting.location}
          </h2>
        </div>
        <h3>Salary: {posting.salary || "unknown"}</h3>

        <h3>Job Posting: </h3>
        <p className="whitespace-pre-wrap">{posting.description}</p>
      </div>
    </>
  );
}

export default JobDoc;
