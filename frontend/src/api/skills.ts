import api from ".";
import type {
  Skill,
  SkillOption,
  SkillCreate,
  SkillOptionCreate,
  SkillUpdate,
} from "@/types";

export const getSkills = async (): Promise<Skill[]> => {
  const response = await api.get<Skill[]>("/skills");
  return response?.data ?? [];
};

export const createSkill = async (skill: SkillCreate): Promise<Skill> => {
  const formattedSkill: SkillCreate = {
    skillOptionsId: skill.skillOptionsId,
    category: skill.category,
    rank: skill.rank,
  };
  const response = await api.post<Skill>("/skills", formattedSkill);
  if (!response?.data) {
    throw new Error("Failed to add skill");
  }
  return response.data;
};

export const updateSkill = async (
  skillId: string,
  skill: SkillUpdate
): Promise<Skill> => {
  const response = await api.put<Skill>(`/skills/${skillId}`, skill);
  if (!response?.data) {
    throw new Error(`Failed to update skill with id: ${skillId}`);
  }
  return response.data;
};

export const deleteSkill = async (skillId: string): Promise<void> => {
  const response = await api.delete(`/skills/${skillId}`);
  if (!response) {
    throw new Error(`Failed to delete skill with id: ${skillId}`);
  }
};

export const getSkillOptions = async (): Promise<SkillOption[]> => {
  const response = await api.get<SkillOption[]>("/skill_options");
  return response?.data ?? [];
};

export const createSkillOption = async (
  skillOption: SkillOptionCreate
): Promise<SkillOption> => {
  const response = await api.post<SkillOption>("/skill_options", skillOption);
  if (!response?.data) {
    throw new Error("Failed to create skill option");
  }
  return response.data;
};
