import jsPDF from "jspdf";
import { useState } from "react";
import { useSelector } from "react-redux";

import Document from "./Document";
import Edit from "./Edit";
import type { State } from "../../../types";

function Resume() {
  const [showForm, setShowForm] = useState(false);
  const lastName: string = useSelector(
    (state: State) => state.personal.lastName
  );

  const onPrint = () => {
    const element = document.getElementById("element-to-convert");
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
      <div className="bg-white p-5">
        <div className="flex place-content-between">
          <button
            className="rounded-md bg-indigo-600 mx-3 p-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 hover:cursor-pointer"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Preview" : "Edit"}
          </button>
          {!showForm && (
            <button
              className="rounded-md border-2 border-indigo-600 mx-3 p-3 text-sm font-semibold text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
              onClick={onPrint}
            >
              Export Resume
            </button>
          )}
        </div>
        {showForm ? <Edit /> : <Document />}
      </div>
    </>
  );
}

export default Resume;
