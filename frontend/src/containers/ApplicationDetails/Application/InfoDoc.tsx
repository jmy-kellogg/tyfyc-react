import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getStatus, getFormattedDate } from "@utils";

import { setPersonal } from "src/store/reducers/personalSlice";
import type { State } from "src/store";
import type { ApplicationUpdate } from "@/types/applications";

interface Props {
  application: ApplicationUpdate;
  setShowForm: (status: boolean) => void;
}

function InfoDoc({ application, setShowForm }: Props) {
  const [popover, setPopover] = useState<boolean>(false);

  const targetJobTitle = useSelector((state: State) => state.personal.jobTitle);

  const dispatch = useDispatch();

  const updateResumeJobTitle = () => {
    dispatch(setPersonal({ jobTitle: application.title }));
  };
  return (
    <>
      <div className="text-end">
        <button
          className="rounded-full border-2 border-indigo-600 p-2 m-4 text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
          onClick={() => setShowForm(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </button>
      </div>

      <div id="job-application-content">
        <div className="flex justify-center">
          <h1>{application.company}</h1>

          {application.companySite && (
            <a href={application.companySite} target="_blank">
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
        <div className="flex justify-center p-2">
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
            <b>Status: </b>{" "}
            {application.status ? getStatus(application.status)?.label : ""}
          </p>
          <p>
            <b>Date Applied: </b>{" "}
            {getFormattedDate(application.dateApplied || "")}
          </p>
          <p>
            <b>Location: </b>
            {application.location}
          </p>
          <p>
            <b>Salary: </b> {application.salary || "unknown"}
          </p>
        </div>
      </div>

      <hr />
    </>
  );
}

export default InfoDoc;
