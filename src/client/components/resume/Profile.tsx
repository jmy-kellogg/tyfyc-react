import { useSelector } from "react-redux";
import { getFormattedDate, divider } from "@utils";
import "./ResumeDoc.css";

import Title from "./inputs/Title";
import Contact from "./inputs/Contact";
import Summary from "./inputs/Summary";
import Skills from "./inputs/Skills";
import JobsHistory from "./inputs/JobsHistory";

import type { State } from "@store";

function Profile() {
  const education = useSelector((state: State) => state.education);
  const projects = useSelector((state: State) => state.projects);

  return (
    <>
      <div id="resume-content">
        <div className="personal-section">
          <Title />
          <Contact />
        </div>

        <div className="body-section">
          <Summary />
          <Skills />
        </div>

        <div className="body-section">
          <JobsHistory />
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
            <h2>Projects</h2>
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

export default Profile;
