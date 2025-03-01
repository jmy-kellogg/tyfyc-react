import { useSelector } from "react-redux";
import { getFormattedDate, divider } from "../../../utils";
import "./ResumeDoc.css";

import type { State } from "../../store";

function Document() {
  const personal = useSelector((state: State) => state.personal);
  const jobHistory = useSelector((state: State) => state.jobHistory.list);
  const skills = useSelector((state: State) => state.skills.list);
  const education = useSelector((state: State) => state.education.list);

  return (
    <>
      <div id="resume-content">
        <div>
          <div className="personal-section">
            <h1>{personal.firstName + " " + personal.lastName}</h1>
            <p>
              {"Email: " + personal.email}
              {" | Phone: " + personal.phone}
              {" | Location: " + personal.city + ", " + personal.state} |
            </p>
            <p>
              LinkedIn: {personal.linkedIn} | GitHub: {personal.gitHub}
            </p>
          </div>
          <p className="divider">{divider()}</p>
          <div className="resume-section">
            {" "}
            <h3>Summary</h3>
            <p>{personal.summary}</p>
          </div>
          <div className="resume-section">
            <h3>Skills</h3>
            <p>{skills.map(({ label }) => label).join(", ")}</p>
          </div>
        </div>
        <p className="divider">{divider()}</p>

        <div>
          <h2>Professional Experience</h2>

          {jobHistory.map((job, index) => (
            <div key={index}>
              <div className="resume-section">
                <h3>{job.title}</h3>
                <h4>
                  {job.company} - {job.location}
                </h4>
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
              </div>
              <p className="divider">{divider()}</p>
            </div>
          ))}
        </div>
        <div>
          <h2>Education</h2>
          {education.map((edu, index) => (
            <div key={index}>
              <div className="resume-section">
                <p>{edu.degree}</p>
                <p>
                  {edu.school +
                    " - " +
                    getFormattedDate(edu.gradYear, { year: "numeric" })}
                </p>
              </div>
              <p className="divider">{divider()}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Document;
