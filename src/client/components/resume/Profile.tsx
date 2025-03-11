import { ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFormattedDate, divider } from "../../../utils";
import "./ResumeDoc.css";

import Personal from "./inputs/Personal";
import { setPersonal } from "../../store/reducers/personalSlice";

import type { State } from "../../store";
import { useState } from "react";
import Contact from "./inputs/Contact";

function Profile() {
  const dispatch = useDispatch();
  const personal = useSelector((state: State) => state.personal);
  const jobHistory = useSelector((state: State) => state.jobHistory);
  const skills = useSelector((state: State) => state.skills);
  const education = useSelector((state: State) => state.education);
  const projects = useSelector((state: State) => state.projects);
  const [hover, setHover] = useState("");

  const updateData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const field = e.target.name;
    const value = e.target.value;
    dispatch(setPersonal({ [field]: value }));
  };

  return (
    <>
      <div id="resume-content">
        <div className="personal-section">
          <div
            onMouseEnter={() => setHover("personal")}
            onMouseLeave={() => setHover("")}
          >
            {hover === "personal" ? (
              <Personal />
            ) : (
              <div>
                <h1>{personal.firstName + " " + personal.lastName}</h1>
                <h3>{personal.jobTitle}</h3>
                <p className="divider">{divider()}</p>
              </div>
            )}
          </div>
          <div
            onMouseEnter={() => setHover("contact")}
            onMouseLeave={() => setHover("")}
          >
            {hover === "contact" ? (
              <Contact />
            ) : (
              <div>
                <p>
                  Email: {personal.email} | Phone: {personal.phone} | Location:{" "}
                  {personal.city + ", " + personal.state}
                </p>
                <p>
                  LinkedIn: {personal.linkedIn} | GitHub: {personal.gitHub}
                </p>
                <p className="divider">{divider()}</p>
              </div>
            )}
          </div>
        </div>

        <div className="body-section">
          <div
            onMouseEnter={() => setHover("summary")}
            onMouseLeave={() => setHover("")}
          >
            <h2>Summary</h2>
            {hover === "summary" ? (
              <div className="mt-2">
                <textarea
                  id="summary"
                  name="summary"
                  className="block w-full rounded-md bg-white px-3 py-1.5 h-32 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
                  value={personal.summary}
                  onChange={updateData}
                ></textarea>
              </div>
            ) : (
              <div className="body-sub-section">
                <p>{personal.summary}</p>
              </div>
            )}
          </div>
          <p className="divider">{divider()}</p>

          <h2>Skills</h2>
          <div className="body-sub-section">
            <p>{skills.map(({ label }) => label).join(", ")}</p>
          </div>

          <p className="divider">{divider()}</p>
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
