
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
   label: string, 
   value: string 
}

export type SkillsList = Array<Skill>

export interface Job {
  title: string;
  company: string;
  location: string;
  start: string;
  end: string;
  description: string;
}

export type JobsList = Array<Job>

export interface Education {
  degree: string;
  school: string;
  gradYear: string;
}

export type EducationList = Array<Education>

//Store
export type PersonalState =  Personal

export interface SkillsState {
  list: SkillsList
}

export interface JobsState {
  list: JobsList
}

export interface EducationState {
  list: EducationList
}

export interface State {
  personal: PersonalState,
  skills: SkillsState,
  jobs: JobsState,
  education: EducationState
}
export interface PersonalStateUpdate {
  field:  keyof PersonalState;
  value: string;
}

// API
export interface ParsedData {
  personal: Personal,
  skills: SkillsList,
  jobs: JobsList,
  education: EducationList
}
