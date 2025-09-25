import api from ".";
import type { Project, ProjectUpdate } from "@/types";

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<Project[]>("/projects");
  return response?.data ?? [];
};

export const createProject = async (
  project: ProjectUpdate
): Promise<Project> => {
  const response = await api.post<Project>("/projects", project);
  if (!response?.data) {
    throw new Error("Failed to create project");
  }
  return response.data;
};

export const updateProject = async (
  projectId: string,
  project: ProjectUpdate
): Promise<Project> => {
  if (!projectId) {
    throw new Error("Project ID is required for update");
  }

  const response = await api.put<Project>(`/projects/${projectId}`, project);
  if (!response?.data) {
    throw new Error(`Failed to update project with id: ${projectId}`);
  }
  return response.data;
};

export const deleteProject = async (projectId: string): Promise<void> => {
  if (!projectId) {
    throw new Error("Project ID is required for deletion");
  }

  const response = await api.delete(`/projects/${projectId}`);
  if (!response) {
    throw new Error(`Failed to delete project with id: ${projectId}`);
  }
};
