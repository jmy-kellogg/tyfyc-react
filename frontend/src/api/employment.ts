import api from ".";
import type { Employment, EmploymentUpdate } from "@/types/employment";

export const getEmploymentList = async (): Promise<Employment[]> => {
  try {
    const response = await api.get("/employment");
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateEmployment = async (
  employment_id: string,
  employment: EmploymentUpdate
): Promise<Employment> => {
  try {
    const response = await api.put(`/employment/${employment_id}`, employment);
    return response.data || {};
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteEmployment = async (employmentId: string) => {
  try {
    await api.delete(`/employment/${employmentId}`);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
