import api from ".";
import type { Education, EducationUpdate } from "@/types";

export const getEducationList = async (): Promise<Education[]> => {
  const response = await api.get("/education");
  return response?.data || [];
};

export const createEducation = async (
  education: EducationUpdate
): Promise<Education> => {
  const response = await api.post(`/education`, education);
  return response?.data || {};
};

export const updateEducation = async (
  education_id: string,
  education: EducationUpdate
): Promise<Education> => {
  const response = await api.put(`/education/${education_id}`, education);
  return response?.data || {};
};

export const deleteEducation = async (educationId: string) => {
  await api.delete(`/education/${educationId}`);
};
