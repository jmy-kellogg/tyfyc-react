import api from ".";
import type { Education, EducationUpdate } from "@/types";

type SanitizedEducation = Education | EducationUpdate;

const sanitizeEduReq = (education: SanitizedEducation): SanitizedEducation => {
  const sanitized: SanitizedEducation = { ...education } as SanitizedEducation;

  for (const key in sanitized) {
    const value = sanitized[key as keyof SanitizedEducation];
    if (typeof value === "string" && value) {
      sanitized[key as keyof SanitizedEducation] = value.trim();
    }
  }

  return sanitized as SanitizedEducation;
};

export const getEducationList = async (): Promise<Education[]> => {
  const response = await api.get<Education[]>("/education");
  return response?.data ?? [];
};

export const createEducation = async (
  education: EducationUpdate
): Promise<Education> => {
  if (!education.school || !education.degree) {
    throw new Error("School and degree are required");
  }

  const sanitizedEducation = sanitizeEduReq(education);

  const response = await api.post<Education>("/education", sanitizedEducation);
  if (!response?.data) {
    throw new Error("Failed to create education record");
  }
  return response.data;
};

export const updateEducation = async (
  educationId: string,
  education: EducationUpdate
): Promise<Education> => {
  if (!educationId) {
    throw new Error("Education ID is required for update");
  }

  if (!education.school || !education.degree) {
    throw new Error("School and degree are required");
  }

  const sanitizedEducation = sanitizeEduReq(education);

  const response = await api.put<Education>(
    `/education/${educationId}`,
    sanitizedEducation
  );
  if (!response?.data) {
    throw new Error(
      `Failed to update education record with id: ${educationId}`
    );
  }
  return response.data;
};

export const deleteEducation = async (educationId: string): Promise<void> => {
  if (!educationId) {
    throw new Error("Education ID is required for deletion");
  }

  const response = await api.delete(`/education/${educationId}`);
  if (!response) {
    throw new Error(
      `Failed to delete education record with id: ${educationId}`
    );
  }
};
