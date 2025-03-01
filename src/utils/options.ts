import { v4 as uuidv4 } from "uuid";
import type { StatusOption, SkillsList, Application } from "../types";

const getToday = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const day = today.getDate();
  const formattedDate = `${year}-${formattedMonth}-${day}`;

  return formattedDate;
};

export const jobDefault: Application = {
  company: "",
  description: "",
  title: "",
  salary: "",
  dateApplied: getToday(),
  location: "",
  status: "applied",
  interviewStages: [],
  notes: "",
  postingLink: "",
  companyLink: "",
  jobId: uuidv4(),
};

export const statusOptions: Array<StatusOption> = [
  { label: "Applied", value: "applied", color: "blue" },
  { label: "Interviewing", value: "interviewing", color: "green" },
  { label: "No Offer", value: "no_offer", color: "slate" },
  { label: "Declined", value: "declined", color: "gray" },
  { label: "Auto Rejected", value: "auto_rejected", color: "gray" },
  { label: "Pending", value: "pending", color: "yellow" },
];

export const skillsOptions: SkillsList = [
  { label: "JavaScript", value: "javascript", alias: ["Javascript"] },
  { label: "TypeScript", value: "typescript", alias: ["Typescript"] },
  { label: "Python", value: "python" },
  { label: "Vue.js", value: "vue", alias: ["Vue.js"] },
  { label: "React", value: "react", alias: ["React.js"] },
  { label: "Django", value: "django" },
  { label: "Flask", value: "flask" },
  { label: "Cypress", value: "cypress" },
  { label: "Jest", value: "jest" },
  { label: "Chai", value: "chai" },
  { label: "Mocha", value: "mocha" },
  { label: "Selenium", value: "selenium" },
  { label: "ES6", value: "es6" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "Bootstrap", value: "bootstrap" },
  { label: "Material UI", value: "material_ui" },
  { label: "Figma", value: "figma" },
  { label: "PO Editor", value: "po_editor" },
  { label: "Node.js", value: "node" },
  { label: "NPM", value: "npm" },
  { label: "WebPack", value: "webpack" },
  { label: "ESBuild", value: "esbuild" },
  { label: "ElasticSearch", value: "elasticsearch" },
  { label: "Redux", value: "redux" },
  { label: "VueX", value: "vuex" },
  { label: "Git", value: "git" },
  { label: "REST", value: "rest" },
  { label: "API", value: "api" },
  { label: "SDK", value: "sdk" },
  { label: "UI/UX", value: "ui/ux" },
  { label: "Prototyping", value: "prototyping" },
  { label: "Microservices", value: "microservices" },
  { label: "Feature Flags", value: "feature_flags" },
  { label: "Vite", value: "vite" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
  { label: "C#", value: "csharp" },
  { label: "Angular", value: "angular" },
  { label: "Ruby on Rails", value: "rails" },
  { label: "Ruby", value: "ruby" },
  { label: "SQL", value: "sql" },
  { label: "PostgreSQL", value: "postgresql" },
  { label: "NoSQL", value: "nosql" },
  { label: "MongoDB", value: "mongodb" },
  { label: "Docker", value: "docker" },
  { label: "Kubernetes", value: "kubernetes" },
  { label: "AWS", value: "aws" },
  { label: "Azure", value: "azure" },
  { label: "Google Cloud", value: "gcp" },
  { label: "CI/CD", value: "ci_cd" },
  { label: "Agile Methodologies", value: "agile" },
  { label: "Scrum", value: "scrum" },
  { label: "DevOps", value: "devops" },
  { label: "Open Source", value: "open_source" },
  { label: "GraphQL", value: "graphql" },
  { label: "Machine Learning", value: "machine_learning" },
  { label: "Data Science", value: "data_science" },
  { label: "Cybersecurity", value: "cybersecurity" },
  { label: "Flutter", value: "flutter" },
];
