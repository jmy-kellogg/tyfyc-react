import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import JobDescription from "./JobDescription";
import { getStatus, getFormattedDate } from "@utils";

import { setPersonal } from "@/reducers/personalSlice";
import type { State } from "@store";
import type { Application } from "@types";

interface Props {
  application: Application;
}

function JobDoc({ application }: Props) {
  const [popover, setPopover] = useState<boolean>(false);
  const targetJobTitle = useSelector((state: State) => state.personal.jobTitle);
  const dispatch = useDispatch();

  const updateResumeJobTitle = () => {
    dispatch(setPersonal({ jobTitle: application.title }));
  };
  return (
    <>
      <div id="job-application-content">
        <div className="flex">
          <h1>{application.company}</h1>

          {application.companyLink && (
            <a href={application.companyLink} target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 mr-2 text-gray-400 hover:text-blue-400 hover:cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                />
              </svg>
            </a>
          )}
        </div>
        <div className="flex">
          {targetJobTitle === application.title ? (
            <h2>{application.title}</h2>
          ) : (
            <button
              className="bg-amber-100 hover:cursor-pointer"
              onMouseEnter={() => setPopover(true)}
              onMouseLeave={() => setPopover(false)}
              onClick={() => updateResumeJobTitle()}
            >
              <h2>{application.title}</h2>
              {popover && (
                <div className="w-64 bg-white border-1 rounded-md absolute p-1">
                  <b>Update on Resume</b>
                </div>
              )}
            </button>
          )}

          {application.postingLink && (
            <a href={application.postingLink} target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 mx-2  mr-2 text-gray-400 hover:text-blue-400 hover:cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                />
              </svg>
            </a>
          )}
        </div>
        <div className="flex place-content-between">
          <p>
            <b>Status: </b> {getStatus(application.status)?.label || ""}
          </p>
          <p>
            <b>Date Applied: </b> {getFormattedDate(application.dateApplied)}
          </p>
          <p>
            <b>Location: </b>
            {application.location}
          </p>
          <p>
            <b>Salary: </b> {application.salary || "unknown"}
          </p>
        </div>
        {application.notes && (
          <div className="my-5">
            <h3>Notes: </h3>
            <p className="whitespace-pre-wrap">{application.notes}</p>
          </div>
        )}
        {application.description && (
          <div className="my-5">
            <h3>Job Description: </h3>

            <JobDescription description={application.description} />
          </div>
        )}
      </div>
    </>
  );
}

export default JobDoc;
