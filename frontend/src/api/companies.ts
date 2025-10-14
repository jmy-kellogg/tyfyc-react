import api from ".";
import type {
  CompanyResearch,
  Company,
  Companies,
  CompanyCreate,
  CompanyUpdate,
} from "../types";

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

export const getCompanies = async (): Promise<Companies> => {
  const response = await api.get<Companies>("/companies");
  return response?.data ?? [];
};

export const getCompany = async (companyId: string): Promise<Company> => {
  const response = await api.get<Company>(`/companies/${companyId}`);
  if (!response?.data) {
    throw new Error(`Failed to fetch company with id: ${companyId}`);
  }
  return response.data;
};

export const addCompany = async (company: CompanyCreate): Promise<Company> => {
  const response = await api.post<Company>("/companies", company);
  if (!response?.data) {
    throw new Error("Failed to create company");
  }
  return response.data;
};

export const updateCompany = async (
  company: CompanyUpdate
): Promise<Company> => {
  if (!company.id) {
    throw new Error("Company ID is required for update");
  }
  const response = await api.put<Company>(
    `/companies/${company.id}`,
    company
  );
  if (!response?.data) {
    throw new Error(`Failed to update company with id: ${company.id}`);
  }
  return response.data;
};

export const deleteCompany = async (companyId: string): Promise<void> => {
  if (!companyId) {
    throw new Error("Company ID is required for deletion");
  }
  const response = await api.delete(`/companies/${companyId}`);
  if (!response) {
    throw new Error(`Failed to delete company with id: ${companyId}`);
  }
};
