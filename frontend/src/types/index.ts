import { ReactElement } from "react";

export type Tab = {
  label: string;
  value: string;
};

export type TabsList = Array<Tab>;

export interface SortableItem {
  id: string;
  component: ReactElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type SortableList = Array<SortableItem>;

// Resume
export interface Personal {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  linkedIn: string;
  gitHub: string;
  summary: string;
}

export interface Skill {
  label: string;
  value: string;
  alias?: Array<string>;
}

export type SkillsList = Array<Skill>;

export interface JobHistory {
  title: string;
  company: string;
  location: string;
  start: string;
  end: string;
  description: string;
}

export type JobHistoryList = Array<JobHistory>;

export interface Education {
  degree: string;
  school: string;
  gradYear: string;
}

export type EducationList = Array<Education>;

export interface Project {
  title: string;
  description: string;
  year?: string;
  url?: string;
}

export type ProjectsList = Array<Project>;

// Application
export interface Application {
  company: string;
  description: string;
  title: string;
  salary: string;
  dateApplied: string;
  location: string;
  status:
    | "applied"
    | "interviewing"
    | "no_offer"
    | "declined"
    | "auto_rejected"
    | "pending";
  interviewStages: Array<string>;
  notes: string;
  postingLink: string;
  companyLink: string;
  jobId: string;
  skills: Array<string>;
  resume: {
    summary: string;
  };
}

export type ApplicationsList = Array<Application>;

export interface StatusOption {
  label: string;
  value: Application["status"];
  color: string;
}

// API
export interface ParsedData {
  personal: Personal;
  skills: SkillsList;
  jobHistory: JobHistoryList;
  education: EducationList;
  projects: ProjectsList;
}
