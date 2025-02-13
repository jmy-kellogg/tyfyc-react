import jsPDF from "jspdf";
import { useState } from "react";
import JobEdit from "./JobEdit";
import JobDoc from "./JobDoc";

interface Props {
  smallDisplay: boolean;
}

function JobPosting({ smallDisplay }: Props) {
  const [showForm, setShowForm] = useState(false);

  const onPrint = () => {
    const element = document.getElementById("job-application-content");
    const doc = new jsPDF();

    if (element) {
      doc.setProperties({
        author: "tyfyc",
        keywords: "resume",
      });

      doc.html(element, {
        callback: function (doc) {
          doc.save(`job_posting.pdf`);
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
      <div className="mx-5 w-full max-w-3xl">
        {!smallDisplay && <h2 className="text-center">Job Posting</h2>}
        <div className="float-right m-5">
          {!showForm && (
            <button
              className="rounded-md border-2 border-indigo-600 mx-3 p-3 text-sm font-semibold text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
              onClick={onPrint}
            >
              Save Application Details
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
          {showForm ? <JobEdit /> : <JobDoc />}
        </div>
      </div>
    </>
  );
}

export default JobPosting;
