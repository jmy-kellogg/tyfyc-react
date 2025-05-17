export interface ProjectBase {
  title: string;
  description: string;
  year: string;
  url: string;
}

export interface Project extends ProjectBase {
  id: string;
  userId: string;
}

export type ProjectCreate = Partial<ProjectBase>;

export type ProjectUpdate = Partial<ProjectBase>;

export type ProjectsList = Array<Project>;
