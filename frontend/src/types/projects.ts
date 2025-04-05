export interface Project {
  title: string;
  description: string;
  year: string;
  url: string;
  id: string;
  userId: string;
}

export interface ProjectCreate {
  title: string;
  description: string;
  year: string;
  url: string;
  gradYear: string;
}

export interface ProjectUpdate {
  title?: string;
  description?: string;
  year?: string;
  url?: string;
}
