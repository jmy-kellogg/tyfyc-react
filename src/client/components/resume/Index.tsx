import jsPDF from "jspdf";
import { useState } from "react";
import { useSelector } from "react-redux";

import Tabs from "../Tabs";
import ResumeDoc from "./ResumeDoc";
import ResumeEdit from "./ResumeEdit";
import type { State } from "../../../types";

interface Props {
  smallDisplay: boolean;
}

function Resume({ smallDisplay }: Props) {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showResume, setShowResume] = useState<boolean>(true);
  const lastName: string = useSelector(
    (state: State) => state.personal.lastName
  );

  const onPrint = () => {
    const element = document.getElementById("resume-content");
    const doc = new jsPDF();

    if (element) {
      doc.setProperties({
        author: "tyfyc",
        keywords: "resume",
      });
      doc.html(element, {
        callback: function (doc) {
          doc.save(`${lastName}_resume.pdf`);
        },
        width: 170,
        windowWidth: 650,
        margin: 5,
        autoPaging: "text",
      });
    }
  };

  return (
    <>
      {showResume ? (
        <div className="w-3xl">
          {!smallDisplay && (
            <Tabs
              tabs={[
                {
                  label: "Resume",
                  value: "resume",
                  onCollapse: () => setShowResume(!showResume),
                },
              ]}
              active="resume"
            />
          )}
          <div className="float-right m-5">
            {!showForm && (
              <button
                className="rounded-md border-2 border-indigo-600 mx-3 p-3 text-sm font-semibold text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
                onClick={onPrint}
              >
                Export Resume
              </button>
            )}
            <button
              className="rounded-md bg-indigo-600 mx-3 p-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 hover:cursor-pointer"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Preview" : "Edit"}
            </button>
          </div>
          <div className="bg-white p-5">
            {showForm ? <ResumeEdit /> : <ResumeDoc />}
          </div>
        </div>
      ) : (
        <div className="bg-white p-3 rounded-t-lg h-screen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 m-auto hover:cursor-pointer hover:font-bold hover:text-blue-400"
            onClick={() => setShowResume(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
        </div>
      )}
    </>
  );
}

export default Resume;
