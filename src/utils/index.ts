import type { SkillsList, Skill, StatusOption, Application } from "../types";

// This is to allow us to see sections when importing pdf, until we have a more robust parser
export const divider = (): string => {
  let index = 100;
  let line = "";
  while (index > 0) {
    index--;
    line += "_";
  }
  return line;
};

// Application Utils
export const statusOptions: Array<StatusOption> = [
  { label: "Applied", value: "applied", color: "blue" },
  { label: "Interviewing", value: "interviewing", color: "green" },
  { label: "No Offer", value: "no_offer", color: "slate" },
  { label: "Declined", value: "declined", color: "gray" },
  { label: "Auto Rejected", value: "auto_rejected", color: "gray" },
  { label: "Pending", value: "pending", color: "yellow" },
];

export const getStatus = (
  statusValue: Application["status"]
): StatusOption | undefined => {
  return statusOptions.find(({ value }) => value === statusValue);
};

export const getFormattedDate = (
  dateString: Application["dateApplied"],
  options: Intl.DateTimeFormatOptions | undefined = {
    day: "numeric",
    month: "short",
  }
): string => {
  const lang = navigator?.language || "en-US";
  const dateOptions = {
    ...options,
    timeZone: "UTC",
  };

  return new Date(dateString).toLocaleDateString(lang, dateOptions);
};

// Skills Utils
export const snake_case_string = (str: string): string => {
  const regex =
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
  const regexOutput = str.match(regex) || [];
  return regexOutput.map((s) => s?.toLowerCase()).join("_");
};

export const createSkill = (newSkill: string): Skill => {
  return {
    label: newSkill,
    value: snake_case_string(newSkill),
  };
};

export const skillsOptions: SkillsList = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Vue.js", value: "vue" },
  { label: "React", value: "react" },
  { label: "Django", value: "django" },
  { label: "Flask", value: "flask" },
  { label: "Cypress", value: "cypress" },
  { label: "Jest", value: "jest" },
  { label: "Chai", value: "chai" },
  { label: "Mocha", value: "mocha" },
  { label: "Selenium", value: "selenium" },
  { label: "ES6", value: "es6" },
  { label: "HTML", value: "html" },
  { label: "CSS/Sass", value: "css/sass" },
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
];
