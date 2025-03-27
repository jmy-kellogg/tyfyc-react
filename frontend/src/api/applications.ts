import api from ".";
import type { ApplicationReqBody, Applications } from "@/types/applications";

export const getApplications = async (): Promise<Applications> => {
  try {
    return (await api.get("/applications"))?.data || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const addApplication = async (application: ApplicationReqBody) => {
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
    await api.post("/applications", formattedApplication);
  } catch (err) {
    console.error(err);
  }
};
