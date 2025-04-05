import api from ".";
import type { Education, EducationUpdate } from "@/types/education";

export const getEducationList = async (): Promise<Education[]> => {
  try {
    const response = await api.get("/education");
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createEducation = async (
  education: EducationUpdate
): Promise<Education> => {
  try {
    const response = await api.post(`/education`, education);
    return response.data || {};
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateEducation = async (
  education_id: string,
  education: EducationUpdate
): Promise<Education> => {
  try {
    const response = await api.put(`/education/${education_id}`, education);
    return response.data || {};
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteEducation = async (educationId: string) => {
  try {
    await api.delete(`/education/${educationId}`);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
