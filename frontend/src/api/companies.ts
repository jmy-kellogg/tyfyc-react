import api from ".";
import type { CompanyResearch } from "../types";

export const getCompanyResearch = async (
  companySite: string
): Promise<CompanyResearch> => {
  if (!companySite?.trim()) {
    throw new Error("Company site URL is required");
  }

  const encodedSite = encodeURIComponent(companySite.trim());
  const response = await api.get<CompanyResearch>(
    `/companies/research?company_site=${encodedSite}`
  );

  if (!response?.data) {
    throw new Error(`Failed to fetch company research for: ${companySite}`);
  }

  return response.data;
};
