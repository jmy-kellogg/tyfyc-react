export interface ApplicationBase {
  company: string;
  title: string;
  status:
    | "applied"
    | "interviewing"
    | "no_offer"
    | "declined"
    | "auto_rejected"
    | "pending"
    | "";
  dateApplied: string;
  location: string;
  salary: string;
  postingLink: string;
  companySite: string;
  posting: string;
  summary: string;
  notes: string;
}

export interface Application extends ApplicationBase {
  id: string;
}

export type ApplicationCreate = Partial<ApplicationBase>;
export type ApplicationUpdate = Partial<Application>;

export type Applications = Array<Application>;
