import api from ".";
import type { Employment, EmploymentUpdate } from "@/types";

export const getEmploymentList = async (): Promise<Employment[]> => {
  const response = await api.get<Employment[]>("/employment");
  return response?.data ?? [];
};

export const createEmployment = async (
  employment: EmploymentUpdate
): Promise<Employment> => {
  const response = await api.post<Employment>("/employment", employment);
  if (!response?.data) {
    throw new Error("Failed to create employment record");
  }
  return response.data;
};

export const updateEmployment = async (
  employmentId: string,
  employment: EmploymentUpdate
): Promise<Employment> => {
  if (!employmentId) {
    throw new Error("Employment ID is required for update");
  }

  const response = await api.put<Employment>(
    `/employment/${employmentId}`,
    employment
  );
  if (!response?.data) {
    throw new Error(
      `Failed to update employment record with id: ${employmentId}`
    );
  }
  return response.data;
};

export const deleteEmployment = async (employmentId: string): Promise<void> => {
  if (!employmentId) {
    throw new Error("Employment ID is required for deletion");
  }

  const response = await api.delete(`/employment/${employmentId}`);
  if (!response) {
    throw new Error(
      `Failed to delete employment record with id: ${employmentId}`
    );
  }
};
