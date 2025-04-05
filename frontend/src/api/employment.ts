import api from ".";
import type { Employment } from "@/types/employment";

export const getEmploymentList = async (): Promise<Employment[]> => {
  try {
    const response = await api.get("/employment");
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
