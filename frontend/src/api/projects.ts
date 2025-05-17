import api from ".";
import type { Project, ProjectUpdate } from "@/types";

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get("/projects");
  return response.data;
};

export const createProject = async (
  project: ProjectUpdate
): Promise<Project> => {
  const response = await api.post(`/projects`, project);
  return response?.data || {};
};

export const updateProject = async (
  projectId: string,
  project: ProjectUpdate
): Promise<Project> => {
  const response = await api.put(`/projects/${projectId}`, project);
  return response?.data || {};
};

export const deleteProject = async (projectId: string) => {
  await api.delete(`/projects/${projectId}`);
};
