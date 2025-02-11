import axios from "axios";
import { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { State, PostingState } from "../../types";
import { updatePosting } from "../store/reducers/postingSlice";

function JobPosting() {
  const showLinkFeature = false;
  const [url, setUrl] = useState("");
  const [html, setHtml] = useState("");
  const posting: PostingState = useSelector((state: State) => state.posting);
  const dispatch = useDispatch();

  const updateData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const field = e.target.name;
    const value = e.target.value;
    dispatch(updatePosting({ [field]: value }));
  };

  const getJobPosting = async () => {
    if (url) {
      try {
        const response = await axios.get("http://localhost:8000/job-posting", {
          params: { url },
        });
        if (response.data.html) {
          setHtml(response.data.html);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onSubmit = () => {
    getJobPosting();
    console.log("Summit");
  };

  return (
    <>
      <div className="bg-white ml-5 p-5 w-full">
        <h1>Job Posting</h1>
        {/* ToDo: allow auto fill directly from job link */}
        {showLinkFeature && (
          <div>
            <label className="text-sm/6 font-medium">Look up Job Posting</label>
            <div className="flex">
              <input
                id="url"
                name="url"
                type="text"
                className="w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button
                className="rounded-md bg-indigo-600 mx-3 p-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 hover:cursor-pointer"
                onClick={onSubmit}
              >
                Search
              </button>
            </div>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        )}
        <div className="sm:col-span-4">
          <label className="block text-sm/6 font-medium">Company</label>
          <div className="mt-2">
            <input
              id="company"
              name="company"
              type="text"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={posting.company}
              onChange={updateData}
            />
          </div>
        </div>
        <div className="sm:col-span-4">
          <label className="block text-sm/6 font-medium">Title</label>
          <div className="mt-2">
            <input
              id="title"
              name="title"
              type="text"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={posting.title}
              onChange={updateData}
            />
          </div>
        </div>
        <div className="sm:col-span-4">
          <label className="block text-sm/6 font-medium">Location</label>
          <div className="mt-2">
            <input
              id="location"
              name="location"
              type="text"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={posting.location}
              onChange={updateData}
            />
          </div>
        </div>
        <div className="sm:col-span-4">
          <label className="block text-sm/6 font-medium">Salary</label>
          <div className="mt-2">
            <input
              id="salary"
              name="salary"
              type="text"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={posting.salary}
              onChange={updateData}
            />
          </div>
        </div>
        <label className="block text-sm/6 font-medium">Job Posting</label>
        <textarea
          id="description"
          name="description"
          className="h-250 w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          value={posting.description}
          onChange={updateData}
        ></textarea>
      </div>
    </>
  );
}

export default JobPosting;
