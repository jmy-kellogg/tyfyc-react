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
}

export type ApplicationReqBody = Partial<ApplicationBase>;

export interface Application extends ApplicationBase {
  id: string;
}

export type Applications = Array<Application>;
