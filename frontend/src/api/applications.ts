import api from ".";
import type {
  ApplicationCreate,
  ApplicationUpdate,
  Applications,
  Application,
} from "@/types/applications";

export const getApplications = async (): Promise<Applications> => {
  const response = await api.get("/applications");
  return response?.data || [];
};

export const getApplication = async (
  applicationId: string
): Promise<Application> => {
  const response = await api.get(`/applications/${applicationId}`);
  return response?.data || {};
};

export const updateApplication = async (
  application: ApplicationUpdate
): Promise<Application> => {
  const response = await api.put(
    `/applications/${application.id}`,
    application
  );
  return response?.data || {};
};

export const addApplication = async (
  application: ApplicationCreate
): Promise<Application> => {
  const reqBody: ApplicationCreate = {
    ...application,
    status: application.status || "applied",
  };

  const response = await api.post("/applications", reqBody);
  return response?.data || {};
};

export const deleteApplication = async (applicationId: string) => {
  await api.delete(`/applications/${applicationId}`);
};
