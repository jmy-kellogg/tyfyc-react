import jsPDF from "jspdf";
import { useSelector } from "react-redux";
import "./FormattedDoc.css";

import type {
  State,
  PersonalState,
  EducationList,
  JobsList,
  SkillsList,
} from "../types";

function FormattedDoc() {
  const personal: PersonalState = useSelector((state: State) => state.personal);
  const jobs: JobsList = useSelector((state: State) => state.jobs.list);
  const skills: SkillsList = useSelector((state: State) => state.skills.list);
  const education: EducationList = useSelector(
    (state: State) => state.education.list
  );

  const divider = (): string => {
    let index = 100;
    let line = "";
    while (index > 0) {
      index--;
      line += "_";
    }
    return line;
  };

  const onPrint = () => {
    const element = document.getElementById("element-to-convert");
    const doc = new jsPDF();

    // extra details we can reference when importing
    doc.setProperties({
      author: "tyfyc",
      keywords: "resume",
    });
    doc.html(element, {
      callback: function (doc) {
        doc.save("sample-document.pdf");
      },
      width: 170,
      windowWidth: 650,
    });
  };

  return (
    <>
      <div className="bg-white p-5">
        <button
          className="sticky float-right  rounded-md bg-indigo-600 mx-3 p-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 hover:cursor-pointer"
          onClick={onPrint}
        >
          Export
        </button>
        <div id="element-to-convert">
          <div>
            <div>
              <h1>
                {personal.firstName} {personal.lastName}
              </h1>
              <p>
                Email: {personal.email} | Phone: {personal.phone} | Location:{" "}
                {personal.city},{personal.state} |
              </p>
              <p>
                LinkedIn: {personal.linkedIn} | {personal.gitHub}
              </p>
              <h2>Summary</h2>
              <p>{personal.summary}</p>
            </div>
            <div>
              <h3>Skills</h3>
              <ul>
                {skills.map((skill) => (
                  <li key={skill.value}>{skill.label}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="divider">{divider()}</p>
          <div>
            <h2>Professional Experience</h2>
            {jobs.map((job, index) => (
              <div key={index}>
                <h3>{job.title}</h3>
                <p>
                  {job.company} - {job.location}
                </p>
                <p>
                  {job.start} - {job.end}
                </p>
                <p>{job.description}</p>
                <p className="divider">{divider()}</p>
              </div>
            ))}
          </div>
          <div>
            <h2>Education</h2>
            {education.map((edu, index) => (
              <div key={index}>
                <p>{edu.degree}</p>
                <p>
                  {edu.school} - {edu.gradYear}
                </p>
                <p className="divider">{divider()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FormattedDoc;
