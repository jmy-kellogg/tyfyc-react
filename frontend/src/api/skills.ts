import api from ".";
import type {
  Skill,
  SkillOption,
  SkillCreate,
  SkillOptionCreate,
  SkillUpdate,
} from "@/types";

export const getSkills = async (): Promise<Skill[]> => {
  const response = await api.get("/skills");
  return response?.data || [];
};

export const addSkill = async (
  skill: SkillCreate
): Promise<Skill | undefined> => {
  const formattedSkill = {
    skillOptionsId: skill.skillOptionsId || "",
    category: skill.category || "",
  };
  const response = await api.post("/skills", formattedSkill);
  return response?.data || {};
};

export const updateSkill = async (
  skillId: string,
  skill: SkillUpdate
): Promise<Skill | undefined> => {
  const response = await api.put(`/skills/${skillId}`, skill);
  return response?.data || {};
};

export const deleteSkill = async (skillId: string) => {
  await api.delete(`/skills/${skillId}`);
};

export const getSkillOptions = async (): Promise<SkillOption[]> => {
  const response = await api.get("/skill_options");
  return response?.data || [];
};

export const addSkillOption = async (
  skillOption: SkillOptionCreate
): Promise<SkillOption> => {
  const response = await api.post("/skill_options", skillOption);
  return response?.data || {};
};
