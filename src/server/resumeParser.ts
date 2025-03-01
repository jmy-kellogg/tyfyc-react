import { snake_case_string, divider } from "../utils";
import type { JobHistoryList, EducationList, ParsedData } from "../types";

const removeSubString = (str = "", sub: string): string => {
  return str.replace(sub, "")?.trim() || "";
};

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

const getPersonal = (textData: Array<string> = []) => {
  const names = textData[0]?.split(" ") || [];
  const contacts = textData[1]?.split("|") || [];
  const location = removeSubString(contacts[2], "Location: ").split(", ") || [];
  const sites = textData[2]?.split("|") || [];
  const summary = textData[5] || "";

  return {
    firstName: names[0]?.trim() || "",
    lastName: names[1]?.trim() || "",
    email: removeSubString(contacts[0], "Email: "),
    phone: removeSubString(contacts[1], "Phone: "),
    city: location[0]?.trim() || "",
    state: location[1]?.trim() || "",
    linkedIn: removeSubString(sites[0], "LinkedIn: "),
    gitHub: removeSubString(sites[1], "GitHub: "),
    summary: summary,
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

const getJobs = (textData: Array<string> = []): JobHistoryList => {
  const jobHistory = textData
    .slice(
      textData.indexOf("Professional Experience") + 1,
      textData.indexOf("Education")
    )
    .join("|||")
    .split(divider());

  const respJobs: JobHistoryList = [];

  jobHistory.forEach((element) => {
    const job = element.split("|||").filter((str) => !!str.trim());
    if (job.length) {
      const start = job[2]?.split(" - ")[0]?.trim() || "";
      const end = job[2]?.split(" - ")[1]?.trim() || "";
      respJobs.push({
        title: job[0] || "",
        company: job[1]?.split(" - ")[0]?.trim() || "",
        location: job[1]?.split(" - ")[1]?.trim() || "",
        start: getInputDate(start),
        end: getInputDate(end),
        description: job.slice(3, job.length).join(" "),
      });
    }
  });

  return respJobs;
};

const getEducation = (textData: Array<string> = []): EducationList => {
  const education = textData
    .slice(textData.indexOf("Education") + 1, textData.length)
    .filter((line) => {
      return !(line.includes("Page (") && line.includes(") Break"));
    })
    .join("|||")
    .split(divider());

  const respEdu: EducationList = [];

  education.forEach((element) => {
    const edu = element.split("|||").filter((str) => !!str.trim());

    if (edu.length == 2) {
      const year = edu[1]?.split(" - ")[1]?.trim() || "";
      respEdu.push({
        degree: edu[0] || "",
        school: edu[1]?.split(" - ")[0]?.trim() || "",
        gradYear: `${year}-05`,
      });
    }
  });
  return respEdu;
};

const parseResume = (rawText: string = ""): ParsedData => {
  const textData = rawText.split("\r\n").filter((str) => !!str.trim());
  console.log(textData);
  return {
    personal: getPersonal(textData),
    skills: getSkills(textData),
    jobHistory: getJobs(textData),
    education: getEducation(textData),
  };
};

export default parseResume;
