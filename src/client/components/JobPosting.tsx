import { useState } from "react";
import axios from "axios";

function JobPosting() {
  const [url, setUrl] = useState("");
  const [html, setHtml] = useState("");

  const getJobPosting = async () => {
    if (url && url.includes("http://")) {
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
        <label className="text-sm/6 font-medium">Email address</label>
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
    </>
  );
}

export default JobPosting;
