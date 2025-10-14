import jsPDF from "jspdf";
import React, { useState, useEffect, MouseEvent } from "react";

import "./ResumeDoc.css";
import PopupEditor from "@/components/RichEditor/PopupEditor";
import { getFormattedDate } from "@utils";
import { getSkills } from "@/api/skills";
import { getEmploymentList } from "@/api/employment";
import { getEducationList } from "@/api/education";
import { getProjects } from "@/api/projects";

import { fetchUser } from "@/api/user";

import type { Education, Project, Employment, User, Skill } from "@/types";

export interface ResumeProps {
  resume: string;
  onSave: (resume: string) => void;
  jobTitle?: string;
}

const Resume: React.FC<ResumeProps> = ({ resume, onSave, jobTitle }) => {
  const [content, setContent] = useState<string>("");
  const [hasChanged, setHasChanged] = useState<boolean>(false);

  const onPrint = (): void => {
    const element = document.getElementById("resume-content");
    const doc = new jsPDF({ format: "A4" });
    if (element) {
      doc.setProperties({
        author: "tyfyc",
        keywords: "resume",
      });
      doc.html(element, {
        callback: function (doc) {
          doc.save("tyfyc_resume.pdf");
        },
        width: 200,
        margin: [5, 5, 5, 5],
        windowWidth: 794,
      });
    }
  };

  const updateResume = (text: string): void => {
    setContent(text);
    setHasChanged(true);
  };

  const saveResume = async (): Promise<void> => {
    if (content) {
      onSave(content);
      setHasChanged(false);
    }
  };

  const employmentItem = (job: Employment): string => {
    return `
      <p>
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
      </p>`;
  };

  const educationItem = (edu: Education): string => {
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
       </p>
    `;
  };

  const projectItem = (project: Project): string => {
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
      </p>
    `;
  };

  const defaultPersonal = (personal: User): string => {
    return `    
    <p>
      <h1 style="text-align: center">${
        personal.firstName + " " + personal.lastName
      }</h1>
      <h2 style="text-align: center">${jobTitle || personal.jobTitle}</h2>
      <hr />
      <p style="text-align: center">
        Email: ${personal.email} | Phone: ${personal.phone} | Location: 
        ${" " + personal.city + ", " + personal.state}
      </p>
      <p style="text-align: center">
        LinkedIn: ${personal.linkedIn} | GitHub: ${personal.gitHub}
      </p>
    </p>`;
  };

  const createSkills = (skills: Skill[]): string => {
    const groupedSkills = skills.reduce(
      (acc, skill) => {
        const category =
          skill.category.charAt(0).toUpperCase() + skill.category.slice(1) ||
          "Other";
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(skill.name);
        return acc;
      },
      {} as Record<string, string[]>
    );

    return Object.entries(groupedSkills)
      .map(
        ([category, skillNames]) =>
          `<p>
            <strong>${category}:</strong>
            <span>${skillNames.join(", ")}</span>
          </p>`
      )
      .join("");
  };

  const createResume = async (): Promise<void> => {
    const employment = (await getEmploymentList()) || [];
    const education = (await getEducationList()) || [];
    const projects = (await getProjects()) || [];
    const skills = (await getSkills()) || [];
    const user = await fetchUser();

    const defaultResume = `
      <p>
        ${user ? defaultPersonal(user) : ""}
        <hr />
        <h2 style="text-align: center">Skills</h2>
        <p>${createSkills(skills)}</p>
        <hr />
        <h2 style="text-align: center">Professional Experience</h2>
        ${employment.map((job) => employmentItem(job)).join("")}
        <hr />
        <h2 style="text-align: center">Projects</h2>
        ${projects.map((project) => projectItem(project)).join("")}
        <hr />
        <h2 style="text-align: center">Education</h2>
        <span style="display: flex">${education.map((edu) => educationItem(edu)).join("")}</span>
        <hr />
      </p>
    `;
    setContent(defaultResume);
    setHasChanged(true);
  };

  useEffect((): void => {
    if (resume) {
      setContent(resume);
      setHasChanged(false);
    }
  }, [resume]);

  return (
    <>
      <div className="w-3xl justify-self-center">
        <div className="flex justify-between">
          <div className="flex">
            <button
              className="flex justify-self-end rounded-md border-2 border-indigo-600 m-3 p-3 text-sm font-semibold text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
              onClick={(e: MouseEvent<HTMLButtonElement>): void => {
                e.stopPropagation();
                createResume();
              }}
            >
              Generate Resume
            </button>
            {hasChanged && (
              <button
                className="flex justify-self-end rounded-md border-2 border-indigo-600 m-3 p-3 text-sm font-semibold text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
                onClick={(e: MouseEvent<HTMLButtonElement>): void => {
                  e.stopPropagation();
                  saveResume();
                }}
              >
                Save Resume
              </button>
            )}
          </div>
          <button
            className="flex justify-self-end rounded-md border-2 border-indigo-600 m-3 p-3 text-sm font-semibold text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
            onClick={(e: MouseEvent<HTMLButtonElement>): void => {
              e.stopPropagation();
              onPrint();
            }}
          >
            Export Resume
          </button>
        </div>
        <div className="document">
          <div id="resume-content">
            <PopupEditor content={content} handleTextChange={updateResume} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Resume;
