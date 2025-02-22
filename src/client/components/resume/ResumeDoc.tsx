import { useSelector } from "react-redux";
import { getFormattedDate } from "../../../utils";
import "./ResumeDoc.css";

import type { State } from "../../store";

function Document() {
  const personal = useSelector((state: State) => state.personal);
  const jobHistory = useSelector((state: State) => state.jobHistory.list);
  const skills = useSelector((state: State) => state.skills.list);
  const education = useSelector((state: State) => state.education.list);

  const divider = (): string => {
    let index = 100;
    let line = "";
    while (index > 0) {
      index--;
      line += "_";
    }
    return line;
  };

  return (
    <>
      <div id="resume-content">
        <div>
          <div>
            <h1>{personal.firstName + " " + personal.lastName}</h1>
            <p>
              {"Email: " + personal.email}
              {" | Phone: " + personal.phone}
              {" | Location: " + personal.city + ", " + personal.state} |
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
          {jobHistory.map((job, index) => (
            <div key={index}>
              <h3>{job.title}</h3>
              <p>
                {job.company} - {job.location}
              </p>
              <p>
                {getFormattedDate(job.start, {
                  month: "short",
                  year: "numeric",
                }) +
                  " - " +
                  getFormattedDate(job.end, {
                    month: "short",
                    year: "numeric",
                  })}
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
                {edu.school +
                  " - " +
                  getFormattedDate(edu.gradYear, { year: "numeric" })}
              </p>
              <p className="divider">{divider()}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Document;
