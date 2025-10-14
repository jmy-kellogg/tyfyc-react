export * from "./applications";
export * from "./education";
export * from "./employment";
export * from "./projects";
export * from "./settings";
export * from "./skills";
export * from "./jobSearch";
export * from "./companies";

import type { Application } from "./applications";

export interface StatusOption {
  id: string;
  label: string;
  value: Application["status"];
  style: string;
  color: string;
}

export interface CompanyResearch {
  name?: string;
  location?: string;
  size?: string;
  industry?: string;
  funding?: string;
  site?: string;
  error?: string;
}
