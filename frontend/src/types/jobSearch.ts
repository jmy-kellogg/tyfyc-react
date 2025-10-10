export interface JobSearchBase {
  link: string;
  name: string;
  details?: string;
  boardName?: string;
}

export interface JobSearch extends JobSearchBase {
  id: string;
  userId: string;
}

export type JobSearchCreate = JobSearchBase;

export type JobSearchUpdate = Partial<JobSearchBase>;

export type JobSearchList = Array<JobSearch>;
