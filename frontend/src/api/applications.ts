import api from ".";
import type {
  ApplicationReqBody,
  ApplicationResBody,
  Applications,
} from "@/types/applications";

export const getApplications = async (): Promise<Applications> => {
  try {
    const response = await api.get("/applications");
    return response?.data || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const addApplication = async (
  application: ApplicationReqBody
): Promise<ApplicationResBody> => {
  const formattedApplication = {
    company: application.company || "",
    title: application.title || "",
    status: application.status || "applied",
    location: application.location || "",
    dateApplied: application.dateApplied || "",
    salary: application.salary || "",
    postingLink: application.postingLink || "",
    companySite: application.companySite || "",
    posting: application.posting || "",
  };

  try {
    const response = await api.post("/applications", formattedApplication);
    return response.data || {};
  } catch (err) {
    console.error(err);
    return {};
  }
};

export const deleteApplication = async (applicationId: string) => {
  try {
    await api.delete(`/applications/${applicationId}`);
  } catch (err) {
    console.error(err);
  }
};
