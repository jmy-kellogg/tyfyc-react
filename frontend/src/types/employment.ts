export interface Employment {
  jobTitle: string;
  company: string;
  start: string;
  end: string;
  location: string;
  description: string;
  id: string;
  userId: string;
}

export interface EmploymentCreate {
  jobTitle: string;
  company: string;
  start: string;
  end: string;
  location: string;
  description: string;
}

export interface EmploymentUpdate {
  jobTitle?: string;
  company?: string;
  start?: string;
  end?: string;
  location?: string;
  description?: string;
}
