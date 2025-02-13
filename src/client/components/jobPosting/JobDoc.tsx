import { useSelector } from "react-redux";

import type { State, PostingState } from "../../../types";

function JobDoc() {
  const posting: PostingState = useSelector((state: State) => state.posting);

  return (
    <>
      <div id="job-application-content">
        <h1>{posting.company}</h1>
        <div className="flex">
          <h2>{posting.title}</h2>
        </div>
        <div className="flex place-content-between">
          <p>
            <b>Status: </b> {posting.status}
          </p>
          <p>
            <b>Date Applied: </b> {posting.dateApplied}
          </p>
          <p>
            <b>Location: </b>
            {posting.location}
          </p>
          <p>
            <b>Salary: </b> {posting.salary || "unknown"}
          </p>
        </div>
        <div className="my-5">
          <h3>Job Description: </h3>
          <p className="whitespace-pre-wrap">{posting.description}</p>
        </div>
      </div>
    </>
  );
}

export default JobDoc;
