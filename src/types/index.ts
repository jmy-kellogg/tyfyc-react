export type Tab = {
  label: string;
  value: string;
};

export type TabsList = Array<Tab>;

// Resume
export interface Personal {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedIn: string;
  gitHub: string;
  city: string;
  state: string;
  summary: string;
}

export interface Skill {
  label: string;
  value: string;
}

export type SkillsList = Array<Skill>;

export interface Job {
  title: string;
  company: string;
  location: string;
  start: string;
  end: string;
  description: string;
}

export type JobsList = Array<Job>;

export interface Education {
  degree: string;
  school: string;
  gradYear: string;
}

export type EducationList = Array<Education>;

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
  jobs: JobsList;
  education: EducationList;
}
