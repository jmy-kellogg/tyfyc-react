import jsPDF from "jspdf";
import { useState } from "react";
import { useSelector } from "react-redux";

import ResumeDoc from "./ResumeDoc";
import ResumeEdit from "./ResumeEdit";
import type { State } from "../../../types";

interface Props {
  smallDisplay: boolean;
}

function Resume({ smallDisplay }: Props) {
  const [showForm, setShowForm] = useState<boolean>(false);
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
      <div className="w-3xl">
        {!smallDisplay && <h2 className="text-center">Resume</h2>}
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
    </>
  );
}

export default Resume;
