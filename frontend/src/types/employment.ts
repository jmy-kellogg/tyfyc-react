export interface EmploymentBase {
  jobTitle: string;
  company: string;
  start: string;
  end: string;
  location: string;
  description: string;
}
export interface Employment extends EmploymentBase {
  id: string;
  userId: string;
}

export type EmploymentCreate = Partial<EmploymentBase>;

export type EmploymentUpdate = Partial<EmploymentBase>;

export type EmploymentList = Array<Employment>;
