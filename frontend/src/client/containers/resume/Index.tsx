import jsPDF from "jspdf";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Tabs from "@/components/Tabs";
import "./ResumeDoc.css";

import { getActiveTab } from "@/reducers/settingsSlice";
import { getFormattedDate, divider } from "@utils";
import type { State } from "@store";

function Resume() {
  const [showDisplay, setShowDisplay] = useState<boolean>(true);
  const smallDisplay = useSelector(
    (state: State) => state.settings.smallDisplay
  );
  const showResume = useSelector((state: State) => state.settings.showResume);
  const activeTab = useSelector(getActiveTab);
  const personal = useSelector((state: State) => state.personal);
  const jobHistory = useSelector((state: State) => state.jobHistory);
  const skills = useSelector((state: State) => state.skills);
  const education = useSelector((state: State) => state.education);
  const projects = useSelector((state: State) => state.projects);
  const lastName = useSelector((state: State) => state.personal.lastName);

  const onPrint = () => {
    const element = document.getElementById("resume-content");
    const doc = new jsPDF({ format: "letter" });

    if (element) {
      doc.setProperties({
        author: "tyfyc",
        keywords: "resume",
      });
      doc.html(element, {
        callback: function (doc) {
          doc.save(`${lastName}_resume.pdf`);
        },
        width: 210,
        margin: [5, 0, 5, 0],
        windowWidth: 816,
        autoPaging: "text",
      });
    }
  };

  useEffect(() => {
    const show = smallDisplay ? activeTab === "resume" : showResume;
    setShowDisplay(show);
  }, [smallDisplay, activeTab, showResume]);

  return (
    <>
      {showDisplay && (
        <div>
          {!smallDisplay && (
            <Tabs
              tabs={[
                {
                  label: "Resume",
                  value: "resume",
                },
              ]}
              active="resume"
            />
          )}
          <div className="bg-white p-5">
            <button
              className="flex justify-self-end rounded-md border-2 border-indigo-600 m-3 p-3 text-sm font-semibold text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
              onClick={onPrint}
            >
              Export Resume
            </button>

            <div id="resume-content">
              <div>
                <div className="personal-section">
                  <h1>{personal.firstName + " " + personal.lastName}</h1>
                  <h3>{personal.jobTitle}</h3>
                  <p className="divider">{divider()}</p>
                  <p>
                    Email: {personal.email} | Phone: {personal.phone} |
                    Location: {personal.city + ", " + personal.state}
                  </p>
                  <p>
                    LinkedIn: {personal.linkedIn} | GitHub: {personal.gitHub}
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
          </div>
        </div>
      )}
    </>
  );
}

export default Resume;
