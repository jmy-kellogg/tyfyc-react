import axios from "axios";
import { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { updatePersonal } from "../../store/reducers/personalSlice";
import { updateJobs } from "../../store/reducers/jobsSlice";
import { updateEducation } from "../../store/reducers/educationSlice";
import { updateSkills } from "../../store/reducers/skillsSlice";

import { type ParsedData } from "../../../types";
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

      dispatch(updatePersonal(parsedData.personal));
      dispatch(updateJobs(parsedData.jobs));
      dispatch(updateEducation(parsedData.education));
      dispatch(updateSkills(parsedData.skills));
    } catch {
      setErrorMsg("Invalid Resume Added");
    }
  };

  return (
    <>
      <div className="mb-4 col-span-full">
        <label className="block text-sm/6 font-medium">
          <h2>
            <b>Upload</b>
          </h2>
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <svg
              className="mx-auto size-12 text-gray-300"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                fill-rule="evenodd"
                d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                clip-rule="evenodd"
              />
            </svg>
            <div className="mt-4 flex text-sm/6 text-gray-600">
              <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500">
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
            <p className="pl-1">or drag and drop</p>
            <p className="text-xs/5 text-gray-600">PDF up to 10MB</p>
          </div>
        </div>
      </div>
      {errorMsg && (
        <div
          className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
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
    </>
  );
}

export default DocUploader;
