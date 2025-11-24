export interface ApplicationBase {
  company: string;
  title: string;
  status:
    | "applied"
    | "accepted"
    | "offer"
    | "interviewing"
    | "no_offer"
    | "rejected"
    | "declined"
    | "auto_rejected"
    | "no_response"
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
  resume: string;
}

export interface Application extends ApplicationBase {
  id: string;
}

export type ApplicationCreate = Partial<ApplicationBase>;

export type ApplicationUpdate = Partial<Application>;

export type Applications = Array<Application>;
