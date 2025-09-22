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
  category: string;
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
