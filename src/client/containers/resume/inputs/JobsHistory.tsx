import { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";

import "../ResumeDoc.css";
import { getFormattedDate } from "@utils";

import { addNewJob, removeJob, setJobs } from "@/reducers/jobHistorySlice";
import type { JobHistory, JobHistoryList } from "@types";
import type { State } from "@store";
import Divider from "@/components/Divider";

interface Props {
  editAll: boolean;
  lockEdit: boolean;
}

function JobsHistory({ editAll, lockEdit }: Props) {
  const dispatch = useDispatch();
  const [hover, setHover] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const jobHistory: JobHistoryList = useSelector(
    (state: State) => state.jobHistory
  );

  const saveJobs = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newJobs = [...jobHistory];
    const job = newJobs[index];
    newJobs[index] = {
      ...job,
      ...{ [e.target.name]: e.target.value },
    };
    dispatch(setJobs(newJobs));
  };

  const addNew = () => {
    dispatch(addNewJob());
  };

  const remove = (index: number) => {
    dispatch(removeJob(index));
  };

  return (
    <>
      <div
        onMouseEnter={() => setShowAdd(true)}
        onMouseLeave={() => setShowAdd(false)}
      >
        <h2>
          <b>Professional Experience </b>
          {!lockEdit && (editAll || showAdd) && (
            <button
              type="button"
              className="float-right rounded-md bg-indigo-600 m-1 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={addNew}
            >
              Add Job
            </button>
          )}
        </h2>
        {jobHistory.map((job: JobHistory, index: number) => (
          <div
            key={index}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
          >
            {!lockEdit && (editAll || hover === index) ? (
              <div className="my-3">
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Title"
                  className="m-1 block font-bold w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={job.title}
                  onChange={(e) => saveJobs(e, index)}
                />
                <div className="flex">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Company"
                    className="m-1 block font-bold w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    value={job.company}
                    onChange={(e) => saveJobs(e, index)}
                  />

                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="Location"
                    className="m-1 block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    value={job.location}
                    onChange={(e) => saveJobs(e, index)}
                  />

                  <input
                    id="start"
                    name="start"
                    type="month"
                    placeholder="Start Date"
                    className="m-1 block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    value={job.start}
                    onChange={(e) => saveJobs(e, index)}
                  />
                  <p className="font-bold self-center"> - </p>
                  <input
                    id="end"
                    name="end"
                    type="month"
                    placeholder="End Date"
                    className="m-1 block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    value={job.end}
                    onChange={(e) => saveJobs(e, index)}
                  />
                </div>

                <label className="block text-sm/6 font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="block w-full rounded-md bg-white px-3 py-1.5 h-32 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={job.description}
                  onChange={(e) => saveJobs(e, index)}
                ></textarea>

                <button
                  type="button"
                  className="rounded-md text-sm/6 my-3 px-2 py-1 outline-1 -outline-offset-1 outline-gray-300 font-semibold shadow-sm hover:bg-indigo-300 outline-1"
                  onClick={() => remove(index)}
                >
                  Remove {job.company}
                </button>
              </div>
            ) : (
              <div key={index}>
                <div className="body-sub-section">
                  <h3>{job.title || "New Employment"}</h3>
                  <h4>
                    {job.company} - {job.location}
                    {" | "}
                    {getFormattedDate(job.start, {
                      month: "short",
                      year: "numeric",
                    }) +
                      " - " +
                      getFormattedDate(job.end, {
                        month: "short",
                        year: "numeric",
                      })}
                  </h4>
                  <p className="whitespace-pre-wrap">{job.description}</p>
                </div>
              </div>
            )}
            <Divider />
          </div>
        ))}
      </div>
    </>
  );
}

export default JobsHistory;
