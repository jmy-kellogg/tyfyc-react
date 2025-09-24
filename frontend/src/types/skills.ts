export interface Skill {
  label: string;
  value: string;
  alias?: Array<string>;
}

export type SkillsList = Array<Skill>;

export interface Skill {
  id: string;
  skillOptionsId: string;
  category: string;
  rank: number | null;
  name: string;
  defaultCategory: string | null;
}

export interface SkillCreate {
  skillOptionsId: string;
  category?: string;
  rank?: number | null;
}

export interface SkillUpdate {
  skillOptionsId: string;
  category?: string;
  rank?: number | null;
}

export interface SkillOption {
  id: string;
  name: string;
  defaultCategory: string | null;
}

export interface SkillOptionCreate {
  name: string;
  defaultCategory?: string;
}

// Skill Select UI
export interface SkillSelect {
  label: string;
  value: string;
  id: string;
  category: string;
  rank: number | null;
}

export interface SkillGroup {
  id: "frontend" | "backend" | "database" | "general" | "";
  name: string;
}
