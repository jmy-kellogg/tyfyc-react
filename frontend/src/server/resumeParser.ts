import { snake_case_string, divider } from "@utils";
import type { EmploymentList, Personal } from "../types";

const getInputDate = (str: string): string => {
  if (str.length) {
    const date = new Date(str);
    const month = date.getMonth() + 1;
    const yyyyMM = `${date.getFullYear()}-${month < 10 ? "0" : ""}${month}`;
    return yyyyMM;
  } else {
    return str;
  }
};

const splitSubSection = (acc: Array<Array<string>>, cur: string) => {
  if (cur === divider()) {
    acc.push([]);
  } else {
    acc[acc.length - 1].push(cur);
  }
  return acc;
};

const getPersonal = (textData: Array<string> = []): Personal => {
  const personal = textData
    .slice(0, textData.indexOf("Skills"))
    .filter((text) => text !== divider());
  const names = personal[0]?.split(" ") || [];
  const jobTitle = personal[1];
  const contacts = personal[2]?.split("|") || [];
  const location = contacts[2]?.split(", ") || [];
  const sites = personal[3]?.split("|") || [];
  const summary = personal.slice(
    personal.indexOf("Summary") + 1,
    personal.length
  );

  return {
    firstName: names[0]?.trim() || "",
    lastName: names[1]?.trim() || "",
    jobTitle: jobTitle?.trim() || "",
    email: contacts[0]?.trim() || "",
    phone: contacts[1]?.trim() || "",
    city: location[0]?.trim() || "",
    state: location[1]?.trim() || "",
    linkedIn: sites[0]?.trim() || "",
    gitHub: sites[1]?.trim() || "",
    summary: summary?.join(" ") || "",
  };
};

const getSkills = (textData: Array<string> = []) => {
  const skills =
    textData
      .slice(
        textData.indexOf("Skills") + 1,
        textData.indexOf("Professional Experience") - 1
      )[0]
      ?.split(", ")
      .map((skill) => ({
        label: skill,
        value: snake_case_string(skill),
      })) || "";
  return skills;
};

const getJobs = (textData: Array<string> = []): EmploymentList => {
  const jobHistory = textData
    .slice(
      textData.indexOf("Professional Experience") + 1,
      textData.indexOf("Education") - 1
    )
    .reduce(splitSubSection, [[]]);

  const respJobs: EmploymentList = [];

  jobHistory.forEach((job) => {
    if (job.length) {
      const companyLine: Array<string> = job[1]?.split(" | ") || [];
      const companyLocation = companyLine[0]?.split(" - ") || [];
      const jobDates: Array<string> = companyLine[1]?.split(" - ") || [];
      const start = jobDates[0]?.trim() || "";
      const end = jobDates[1]?.trim() || "";

      respJobs.push({
        title: job[0] || "",
        company: companyLocation[0]?.trim() || "",
        location: companyLocation[1]?.trim() || "",
        start: getInputDate(start),
        end: getInputDate(end),
        description: job.slice(2, job.length).join(" "),
      });
    }
  });

  return respJobs;
};

const getEducation = (textData: Array<string> = []) => {
  const education = textData
    .slice(textData.indexOf("Education") + 1, textData.indexOf("Projects") - 1)
    .reduce(splitSubSection, [[]]);
  const respEdu = [];

  education.forEach((edu) => {
    if (edu.length == 2) {
      const date = edu[1]?.split(" - ")[1]?.trim() || "";
      respEdu.push({
        degree: edu[0] || "",
        school: edu[1]?.split(" - ")[0]?.trim() || "",
        gradYear: getInputDate(date),
      });
    }
  });
  return respEdu;
};

const getProjects = (textData: Array<string> = []) => {
  const projects = textData
    .slice(textData.indexOf("Projects") + 1, textData.length - 1)
    .reduce(splitSubSection, [[]]);
  const respProjects = [];

  projects.forEach((project) => {
    if (project.length) {
      respProjects.push({
        title: project[0] || "",
        description: project[1] || "",
        year: getInputDate(project[2] || ""),
      });
    }
  });

  return respProjects;
};

const parseResume = (rawText: string = "") => {
  const textData = rawText
    .split("\r\n")
    .filter((str) => !str.includes("---Page (") && !!str.trim());

  return {
    personal: getPersonal(textData),
    skills: getSkills(textData),
    jobHistory: getJobs(textData),
    education: getEducation(textData),
    projects: getProjects(textData),
  };
};

export default parseResume;
