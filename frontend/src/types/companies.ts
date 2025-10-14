export enum WorkplaceType {
  REMOTE = "remote",
  HYBRID = "hybrid",
  ONSITE = "onsite",
  UNKNOWN = "unknown",
}

export interface Company {
  id: string;
  user_id: string;
  site: string;
  name: string;
  industry?: string;
  summary?: string;
  size?: string;
  location?: string;
  funding?: string;
  workplace_type?: WorkplaceType;
  verified: boolean;
}

export interface CompanyCreate {
  site: string;
  name: string;
  industry?: string;
  summary?: string;
  size?: string;
  location?: string;
  funding?: string;
  workplace_type?: WorkplaceType;
  verified?: boolean;
}

export interface CompanyUpdate {
  id: string;
  site?: string;
  name?: string;
  industry?: string;
  summary?: string;
  size?: string;
  location?: string;
  funding?: string;
  workplace_type?: WorkplaceType;
  verified?: boolean;
}

export type Companies = Company[];
