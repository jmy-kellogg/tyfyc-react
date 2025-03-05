import { useSelector } from "react-redux";
import { getFormattedDate, divider } from "../../../utils";
import "./ResumeDoc.css";

import type { State } from "../../store";

function Document() {
  const personal = useSelector((state: State) => state.personal);
  const jobHistory = useSelector((state: State) => state.jobHistory.list);
  const skills = useSelector((state: State) => state.skills.list);
  const education = useSelector((state: State) => state.education.list);
  const projects = useSelector((state: State) => state.projects);

  return (
    <>
      <div id="resume-content">
        <div>
          <div className="personal-section">
            <h1>{personal.firstName + " " + personal.lastName}</h1>
            <h3>{personal.jobTitle}</h3>
            <p className="divider">{divider()}</p>
            <p>
              <b>Email:</b> {personal.email} | <b>Phone:</b> {personal.phone} |{" "}
              <b>Location:</b> {personal.city + ", " + personal.state}
            </p>
            <p>
              <b>LinkedIn:</b> {personal.linkedIn} | <b>GitHub:</b>{" "}
              {personal.gitHub}
            </p>
            <p className="divider">{divider()}</p>
          </div>

          <div className="body-section">
            <h2>Summary</h2>
            <div className="body-sub-section">
              <p>{personal.summary}</p>
            </div>
            <h2>Skills</h2>
            <div className="body-sub-section">
              <p>{skills.map(({ label }) => label).join(", ")}</p>
            </div>
            <p className="divider">{divider()}</p>
          </div>
        </div>

        <div className="body-section">
          <h2>Professional Experience</h2>

          {jobHistory.map((job, index) => (
            <div key={index}>
              <div className="body-sub-section">
                <h3>{job.title}</h3>
                <h4>
                  {job.company} - {job.location}
                  {" | "}
                  {getFormattedDate(job.start, {
                    month: "short",
                    year: "numeric",
                  }) +
                    " - " +
                    getFormattedDate(job.end, {
                      month: "short",
                      year: "numeric",
                    })}
                </h4>
                <p className="whitespace-pre-wrap">{job.description}</p>
              </div>
              <p className="divider">{divider()}</p>
            </div>
          ))}
        </div>
        {education.length && (
          <div className="body-section">
            <h2>Education</h2>
            {education.map((edu, index) => (
              <div key={index}>
                <div className="body-sub-section">
                  <p>{edu.degree}</p>
                  <p>
                    {edu.school +
                      " - " +
                      getFormattedDate(edu.gradYear, {
                        month: "short",
                        year: "numeric",
                      })}
                  </p>
                </div>
                <p className="divider">{divider()}</p>
              </div>
            ))}
          </div>
        )}
        {projects.length && (
          <div className="body-section">
            <h2>Project</h2>
            {projects.map((project, index) => (
              <div key={index}>
                <div className="body-sub-section">
                  {project.url ? (
                    <a href={project.url}>
                      {" "}
                      <h3>{project.title}</h3>
                    </a>
                  ) : (
                    <h3>{project.title}</h3>
                  )}
                  <p>{project.description}</p>
                  {project.year && (
                    <p>
                      {getFormattedDate(project.year, {
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                  {project.links &&
                    project.links.map((link) => (
                      <a href={link.url}>{link.text || link.url}</a>
                    ))}
                </div>
                <p className="divider">{divider()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Document;
