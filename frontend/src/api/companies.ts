import api from ".";

export const getCompanyResearch = async (companySite: string) => {
  const response = await api.get(
    `/companies/research?company_site=${companySite}`
  );

  return response?.data || {};
};
