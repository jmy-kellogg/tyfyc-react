import api from ".";
import type { JobSearch, JobSearchCreate, JobSearchUpdate } from "@/types";

export const getJobSearches = async (): Promise<JobSearch[]> => {
  const response = await api.get<JobSearch[]>("/job_search");
  return response?.data ?? [];
};

export const getJobSearch = async (jobSearchId: string): Promise<JobSearch> => {
  const response = await api.get<JobSearch>(`/job_search/${jobSearchId}`);
  if (!response?.data) {
    throw new Error(`Failed to fetch job search with id: ${jobSearchId}`);
  }
  return response.data;
};

export const createJobSearch = async (
  jobSearch: JobSearchCreate
): Promise<JobSearch> => {
  const response = await api.post<JobSearch>("/job_search", jobSearch);
  if (!response?.data) {
    throw new Error("Failed to create job search");
  }
  return response.data;
};

export const updateJobSearch = async (
  jobSearchId: string,
  jobSearch: JobSearchUpdate
): Promise<JobSearch> => {
  if (!jobSearchId) {
    throw new Error("Job search ID is required for update");
  }

  const response = await api.put<JobSearch>(
    `/job_search/${jobSearchId}`,
    jobSearch
  );
  if (!response?.data) {
    throw new Error(`Failed to update job search with id: ${jobSearchId}`);
  }
  return response.data;
};

export const deleteJobSearch = async (jobSearchId: string): Promise<void> => {
  if (!jobSearchId) {
    throw new Error("Job search ID is required for deletion");
  }

  const response = await api.delete(`/job_search/${jobSearchId}`);
  if (!response) {
    throw new Error(`Failed to delete job search with id: ${jobSearchId}`);
  }
};
