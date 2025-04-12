import jsPDF from "jspdf";
import { useState, useContext, useEffect } from "react";

import "./ResumeDoc.css";
import PopupEditor from "@/components/RichEditor/PopupEditor";
import { AuthContext } from "@/context/AuthContext";
import { getFormattedDate } from "@utils";
import { getSkills } from "@/api/skills";
import { getEmploymentList } from "@/api/employment";
import { getEducationList } from "@/api/education";
import { getProjects } from "@/api/projects";
import { updateUser } from "@/api/user";
import type { Education } from "@/types/education";
import type { Project } from "@/types/projects";
import type { Employment } from "@/types/employment";
import type { User } from "@/types/index";

function Resume() {
  const [content, setContent] = useState("");
  const [hasChanged, setHasChanged] = useState(false);
  const { user } = useContext(AuthContext);

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
          doc.save(`${user?.lastName || "tyfyc"}_resume.pdf`);
        },
        width: 210,
        margin: [5, 0, 5, 0],
        windowWidth: 816,
        autoPaging: "text",
      });
    }
  };

  const updateResume = (text: string) => {
    setContent(text);
    setHasChanged(true);
  };

  const saveResume = async () => {
    if (content) {
      await updateUser({ resume: content });
      setHasChanged(false);
    }
  };

  const employmentItem = (job: Employment) => {
    return `<p>
        <h3>${job.jobTitle}</h3>
        <h4>
          ${job.company} - ${job.location}${" | "}
          ${
            getFormattedDate(job.start, {
              month: "short",
              year: "numeric",
            }) +
            " - " +
            getFormattedDate(job.end, {
              month: "short",
              year: "numeric",
            })
          }
        </h4>
        <p className="whitespace-pre-wrap">${job.description}</p>
        <hr />
      </p>`;
  };

  const educationItem = (edu: Education) => {
    return `
       <p>
           <p>${edu.degree}</p>
           <p>
             ${
               edu.school +
               " - " +
               getFormattedDate(edu.gradYear, {
                 month: "short",
                 year: "numeric",
               })
             }
           </p>
          <hr />
       </p>
    `;
  };

  const projectItem = (project: Project) => {
    return `
      <p>
          ${
            project.url
              ? `<a href={${project.url}}>
              <h3>${project.title}</h3>
            </a>`
              : `<h3>${project.title}</h3>`
          }
          <p className="whitespace-pre-wrap">${project.description}</p>
          ${
            project.year
              ? `<p>
              ${getFormattedDate(project.year, {
                month: "short",
                year: "numeric",
              })}
            </p>`
              : ""
          }
        <hr />
      </p>
    `;
  };

  const defaultPersonal = (personal: User) => {
    return `    
    <p>
      <h1 style="text-align: center">${
        personal.firstName + " " + personal.lastName
      }</h1>
      <h2 style="text-align: center">${personal.jobTitle}</h2>
      <hr />
      <p style="text-align: center">
        Email: ${personal.email} | Phone: ${personal.phone} | Location: 
        ${" " + personal.city + ", " + personal.state}
      </p>
      <p style="text-align: center">
        LinkedIn: ${personal.linkedIn} | GitHub: ${personal.gitHub}
      </p>
      <hr />
      <h2 style="text-align: center">Summary</h2>
      <p>${personal.summary}</p>
      <hr />
    </p>`;
  };

  const createResume = async () => {
    const employment = (await getEmploymentList()) || [];
    const education = (await getEducationList()) || [];
    const projects = (await getProjects()) || [];
    const skills = (await getSkills()) || [];

    const defaultResume = `
      <p>
        ${user ? defaultPersonal(user) : ""}
        <h2 style="text-align: center">Skills</h2>
        <p>${skills.map(({ name }) => name).join(", ")}</p>
        <h2 style="text-align: center">Professional Experience</h2>
        ${employment.map((job) => employmentItem(job)).join("")}
        <h2 style="text-align: center">Education</h2>
        ${education.map((edu) => educationItem(edu)).join("")}
        <h2 style="text-align: center">Projects</h2>
        ${projects.map((project) => projectItem(project)).join("")}
      </p>
    `;
    setContent(defaultResume);
    setHasChanged(true);
  };

  useEffect(() => {
    if (user?.resume) {
      setContent(user.resume);
      setHasChanged(false);
    }
  }, [user]);

  return (
    <>
      <div className="page">
        <div className="w-3xl justify-self-center">
          <div className="flex justify-between">
            <div className="flex">
              <button
                className="flex justify-self-end rounded-md border-2 border-indigo-600 m-3 p-3 text-sm font-semibold text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
                onClick={createResume}
              >
                Generate Resume
              </button>
              {hasChanged && (
                <button
                  className="flex justify-self-end rounded-md border-2 border-indigo-600 m-3 p-3 text-sm font-semibold text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
                  onClick={saveResume}
                >
                  Save Resume
                </button>
              )}
            </div>
            <button
              className="flex justify-self-end rounded-md border-2 border-indigo-600 m-3 p-3 text-sm font-semibold text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
              onClick={onPrint}
            >
              Export Resume
            </button>
          </div>
          <div id="resume-content">
            <PopupEditor content={content} handleTextChange={updateResume} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Resume;
