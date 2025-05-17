import api from ".";
import type { Employment, EmploymentUpdate } from "@/types";

export const getEmploymentList = async (): Promise<Employment[]> => {
  const response = await api.get("/employment");
  return response?.data || [];
};

export const createEmployment = async (
  employment: EmploymentUpdate
): Promise<Employment> => {
  const response = await api.post(`/employment`, employment);
  return response?.data || {};
};

export const updateEmployment = async (
  employment_id: string,
  employment: EmploymentUpdate
): Promise<Employment> => {
  const response = await api.put(`/employment/${employment_id}`, employment);
  return response?.data || {};
};

export const deleteEmployment = async (employmentId: string) => {
  await api.delete(`/employment/${employmentId}`);
};
