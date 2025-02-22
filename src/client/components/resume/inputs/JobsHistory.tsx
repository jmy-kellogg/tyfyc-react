import { ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewJob,
  removeJob,
  updateJobs,
} from "../../../store/reducers/jobHistorySlice";

import type { JobHistory, JobHistoryList } from "../../../../types";
import type { State } from "../../../store";

function JobsHistory() {
  const jobHistory: JobHistoryList = useSelector(
    (state: State) => state.jobHistory.list
  );
  const dispatch = useDispatch();

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
    dispatch(updateJobs(newJobs));
  };

  const addNew = () => {
    dispatch(addNewJob());
  };

  const remove = (index: number) => {
    dispatch(removeJob(index));
  };

  return (
    <>
      <div className="col-span-full">
        <h2>
          <b>Professional Experience </b>
        </h2>
        {jobHistory.map((job: JobHistory, index: number) => (
          <div className="border-b border-gray-300 my-3" key={index}>
            <label className="block text-sm/6 font-medium">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={job.title}
              onChange={(e) => saveJobs(e, index)}
            />
            <label className="block text-sm/6 font-medium">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={job.company}
              onChange={(e) => saveJobs(e, index)}
            />

            <label className="block text-sm/6 font-medium">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={job.location}
              onChange={(e) => saveJobs(e, index)}
            />
            <label className="block text-sm/6 font-medium">End</label>
            <input
              id="end"
              name="end"
              type="month"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={job.end}
              onChange={(e) => saveJobs(e, index)}
            />

            <label className="block text-sm/6 font-medium">Start</label>
            <input
              id="start"
              name="start"
              type="month"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={job.start}
              onChange={(e) => saveJobs(e, index)}
            />

            <label className="block text-sm/6 font-medium">Description</label>
            <textarea
              id="description"
              name="description"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
        ))}
        <button
          type="button"
          className="rounded-md bg-indigo-600 my-3 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={addNew}
        >
          Add Job
        </button>
      </div>
    </>
  );
}

export default JobsHistory;
