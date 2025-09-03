import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import RichEditor from "@/components/RichEditor";
import { addApplication } from "@/api/applications";
import { getCompanyResearch } from "@/api/companies";
import { getToday } from "@/utils";
import { setActiveTab, addJobTabs } from "src/store/reducers/navigationSlice";
import type { ApplicationCreate, Application } from "@/types";
import type { State } from "@/store";

interface CompanyInfo {
  status: string;
  message: string;
  company?: string;
}

function NewJobModal() {
  const dispatch = useDispatch();
  const flags = useSelector((state: State) => state.auth.flags);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [hover, setHover] = useState(false);
  const [companySite, setCompanySite] = useState<string>("");
  const [postingLink, setPostingLink] = useState<string>("");
  const [posting, setPosting] = useState<string>("<p></p>");
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    status: "",
    message: "",
    company: "",
  });

  const setText = async (text: string) => {
    setPosting(text);
  };

  const clearAndClose = () => {
    setShowModal(false);
    setCompanySite("");
    setPostingLink("");
    setPosting("");
    setCompanyInfo({ status: "", message: "" });
  };

  const submit = async () => {
    const reqBody: ApplicationCreate = {
      companySite: companySite,
      postingLink: postingLink,
      posting: posting,
      dateApplied: getToday(),
      status: "applied",
      company: companyInfo.company || "",
    };

    try {
      const application: Application = await addApplication(reqBody);

      if (application.id) {
        dispatch(
          addJobTabs({
            label: application.company || "Job",
            value: application.id,
          })
        );
        dispatch(setActiveTab(application.id));
      }

      clearAndClose();
    } catch {
      setCompanyInfo({
        status: "error",
        message: "Error on submit. Please try again",
      });
    }
  };

  const research = async () => {
    setCompanyInfo({ status: "loading", message: "Loading..." });
    try {
      const companyResearch = await getCompanyResearch(companySite);

      if (companyResearch.error) {
        setCompanyInfo({ status: "error", message: companyResearch.error });
      } else {
        const { name, location, size, industry, funding } = companyResearch;
        const message = [
          `Company Name: ${name}`,
          `HQ Location: ${location}`,
          `Company Size: ${size}`,
          `Industry: ${industry}`,
          `Latest Funding: ${funding}`,
        ].join("\n");

        setCompanyInfo({ status: "success", message: message, company: name });
      }
    } catch {
      setCompanyInfo({
        status: "error",
        message: "failed to get info on company",
      });
    }
  };

  return (
    <>
      <button
        className="fixed top-0 right-0 flex align-bottom rounded-md bg-indigo-600 text-white m-3 p-2 font-semibold shadow-md hover:cursor-pointer hover:bg-indigo-500"
        type="button"
        onClick={() => setShowModal(true)}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
        {hover && <span className="ml-2">Add Application</span>}
      </button>

      {showModal && (
        <div
          id="default-modal"
          className="backdrop-brightness-50 overflow-y-auto overflow-x-hidden fixed z-50 w-full md:inset-0"
        >
          <div className="bg-white p-4 w-2xl h-auto rounded-lg m-auto mt-10">
            <div className="flex items-center justify-between p-1 border-b border-slate-300 rounded-t">
              <h2 className="w-full text-center">New Application</h2>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={clearAndClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                  id="close-new-job-modal"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            <div className="m-3 h-full">
              <div className="flex">
                <div className="w-full">
                  <div className="flex">
                    <input
                      id="companySite"
                      name="companySite"
                      placeholder="Company Site"
                      type="text"
                      className="w-full h-fit m-1 rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                      value={companySite}
                      onChange={(e) => setCompanySite(e.target.value)}
                    />
                    {flags.includes("OPENAI_FEATURE_FLAG") && (
                      <button
                        type="button"
                        className="rounded-md text-indigo-600 border border-indigo-600 m-1 px-3 py-1.5 font-semibold shadow-md hover:cursor-pointer hover:bg-indigo-500 hover:text-white disabled:border-gray-200 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none"
                        onClick={research}
                        disabled={
                          companyInfo.status === "success" ||
                          companyInfo.status === "loading" ||
                          companySite === ""
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                  <input
                    id="postingLink"
                    name="postingLink"
                    placeholder="Posting Link"
                    type="text"
                    className="w-full h-fit m-1 rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    value={postingLink}
                    onChange={(e) => setPostingLink(e.target.value)}
                  />
                </div>
              </div>
              <div className="m-2 border border-gray-300 rounded-lg">
                {companyInfo.status && (
                  <div className="flex">
                    <label className="m-2 block text-lg font-medium text-center">
                      Company Information
                    </label>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                      onClick={() => {
                        setCompanyInfo({ status: "", message: "" });
                      }}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                        id="clear-research"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                    </button>
                  </div>
                )}
                {companyInfo.status === "loading" && <div>Loading...</div>}
                {companyInfo.status === "error" && (
                  <div className="bg-red-100 border border-red-400 text-red-700">
                    Error: {companyInfo.message}
                  </div>
                )}
                {companyInfo.status === "success" && (
                  <div className="mx-5 whitespace-pre-line">
                    {companyInfo.message}
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-md bg-indigo-600 text-white mt-2 p-2 place-self-end font-semibold shadow-md hover:cursor-pointer hover:bg-indigo-500 disabled:border-gray-200 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none"
                  disabled={!posting || posting === "<p></p>"}
                  onClick={submit}
                >
                  Submit
                </button>
              </div>
              <label className="block text-lg font-medium text-center">
                Copy/Paste job Posting
              </label>
              <div className="flex min-h-200">
                <RichEditor content={posting} onTextChange={setText} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NewJobModal;
