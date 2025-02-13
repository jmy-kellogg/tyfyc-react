import axios from "axios";
import Papa from "papaparse";
import { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { State, PostingState } from "../../../types";
import { updatePosting } from "../../store/reducers/postingSlice";

function JobEdit() {
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

  const onFilePicked = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files || [];
    const file: File = files[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        complete: function ({ data }) {
          const posting = data[0];
          if (posting) {
            dispatch(updatePosting(posting));
          }
        },
        error: function (error) {
          console.error("Error parsing CSV:", error);
        },
      });
    }
  };

  return (
    <>
      <div className="float-right mt-3">
        <label className="rounded-md border-2 border-indigo-600 p-3 text-sm font-semibold text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer">
          <span>Upload CSV</span>
          <input
            id="csv-upload"
            name="csvUpload"
            type="file"
            className="sr-only"
            accept=".csv"
            onChange={onFilePicked}
          />
        </label>
      </div>
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
      <div className="inline-block">
        <div className="grid grid-row-4 gap-2">
          <div className="col-span-6">
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
          <div className="col-span-6">
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
          <div className="col-span-1">
            <label className="block text-sm/6 font-medium">Status</label>
            <div className="mt-2">
              <input
                id="status"
                name="status"
                type="text"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={posting.status}
                onChange={updateData}
              />
            </div>
          </div>
          <div className="col-span-1">
            <label className="block text-sm/6 font-medium">Date Applied</label>
            <div className="mt-2">
              <input
                id="dateApplied"
                name="dateApplied"
                type="text"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                value={posting.dateApplied}
                onChange={updateData}
              />
            </div>
          </div>
          <div className="col-span-1">
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
          <div className="col-span-2">
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
          <div className="col-span-6">
            <label className="block text-sm/6 font-medium">Job Posting</label>
            <textarea
              id="description"
              name="description"
              className="h-250 w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={posting.description}
              onChange={updateData}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobEdit;
