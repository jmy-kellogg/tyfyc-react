import { ReactElement } from "react";
import { Application } from "./applications";

export interface LoginReq {
  username: string;
  password: string;
}

export interface RegisterUserReq {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  jobTitle?: string;
  summary?: string;
  city?: string;
  state?: string;
  phone?: string;
  gitHub?: string;
  linkedIn?: string;
}

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

export interface User {
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
  username: string;
  id: string;
  hashedPassword: string;
}

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
