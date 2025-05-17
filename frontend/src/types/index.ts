export * from "./applications";
export * from "./education";
export * from "./employment";
export * from "./projects";
export * from "./settings";
export * from "./skills";

import type { Application } from "./applications";

export interface StatusOption {
  label: string;
  value: Application["status"];
  color: string;
}

// // API
// export interface ParsedData {
//   personal: Personal;
//   skills: SkillsList;
//   jobHistory: JobHistoryList;
//   education: EducationList;
//   projects: ProjectsList;
// }
