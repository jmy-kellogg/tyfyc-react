import api from ".";
import type {
  ApplicationCreate,
  ApplicationUpdate,
  Applications,
  Application,
} from "@/types";

interface PaginationOptions {
  skip?: number;
  limit?: number;
}

export const getApplications = async (
  options?: PaginationOptions
): Promise<Applications> => {
  const params = new URLSearchParams();
  if (options?.skip !== undefined) params.append("skip", options.skip.toString());
  if (options?.limit !== undefined) params.append("limit", options.limit.toString());

  const url = params.toString() ? `/applications?${params.toString()}` : "/applications";
  const response = await api.get<Applications>(url);
  return response?.data ?? [];
};

export const getApplication = async (
  applicationId: string
): Promise<Application> => {
  const response = await api.get<Application>(`/applications/${applicationId}`);
  if (!response?.data) {
    throw new Error(`Failed to fetch application with id: ${applicationId}`);
  }
  return response.data;
};

export const updateApplication = async (
  application: ApplicationUpdate
): Promise<Application> => {
  if (!application.id) {
    throw new Error("Application ID is required for update");
  }
  const response = await api.put<Application>(
    `/applications/${application.id}`,
    application
  );
  if (!response?.data) {
    throw new Error(`Failed to update application with id: ${application.id}`);
  }
  return response.data;
};

export const addApplication = async (
  application: ApplicationCreate
): Promise<Application> => {
  const reqBody: ApplicationCreate = {
    ...application,
    status: application.status ?? "applied",
  };

  const response = await api.post<Application>("/applications", reqBody);
  if (!response?.data) {
    throw new Error("Failed to create application");
  }
  return response.data;
};

export const deleteApplication = async (
  applicationId: string
): Promise<void> => {
  if (!applicationId) {
    throw new Error("Application ID is required for deletion");
  }
  const response = await api.delete(`/applications/${applicationId}`);
  if (!response) {
    throw new Error(`Failed to delete application with id: ${applicationId}`);
  }
};
