import api from ".";
import type { Skill, SkillOption, SkillCreate } from "@/types/skills";

export const getSkills = async (): Promise<Skill[]> => {
  try {
    const response = await api.get("/skills");
    return response?.data || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const addSkill = async (
  skill: SkillCreate
): Promise<Skill | undefined> => {
  const formattedSkill = {
    skillOptionsId: skill.skillOptionsId || "",
    category: skill.category || "",
  };
  try {
    const response = await api.post("/skills", formattedSkill);
    return response.data || {};
  } catch (err) {
    console.error(err);
  }
};

export const deleteSkill = async (skillId: string) => {
  try {
    await api.delete(`/skills/${skillId}`);
  } catch (err) {
    console.error(err);
  }
};

export const getSkillOptions = async (): Promise<SkillOption[]> => {
  try {
    const response = await api.get("/skill_options");
    return response?.data || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};
