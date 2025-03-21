import axios from "axios";
import { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import { setPersonal } from "src/store/reducers/personalSlice";
import { setJobs } from "src/store/reducers/jobHistorySlice";
import { setEducation } from "src/store/reducers/educationSlice";
import { setSkills } from "src/store/reducers/skillsSlice";
import { setProjects } from "src/store/reducers/projectsSlice";
import type { ParsedData } from "@types";

function DocUploader() {
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const onFilePicked = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files || [];
    const file: File = files[0];

    setErrorMsg("");

    // Send to be parsed by the API
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/parser",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // ToDo: move the request and updates to the store
      // also make sure to sync with localStorage
      const parsedData: ParsedData = response.data;

      dispatch(setPersonal(parsedData.personal));
      dispatch(setJobs(parsedData.jobHistory));
      dispatch(setEducation(parsedData.education));
      dispatch(setSkills(parsedData.skills));
      dispatch(setProjects(parsedData.projects));
    } catch {
      setErrorMsg("Invalid Resume Added");
    }
  };

  return (
    <>
      <div className="flex content-center h-10 ">
        {errorMsg && (
          <div
            className="flex items-center h-10 p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            <svg
              className="shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}
        <div className="rounded-md h-10 content-center border-2 border-indigo-600 mx-3 px-2 text-sm font-semibold text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer">
          <label>
            <span>Upload TYFYC Created Resume</span>
            <input
              id="file-upload"
              name="fileUpload"
              type="file"
              className="sr-only"
              accept="application/pdf"
              onChange={onFilePicked}
            />
          </label>
        </div>
      </div>
    </>
  );
}

export default DocUploader;
