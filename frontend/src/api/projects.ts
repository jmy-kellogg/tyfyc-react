import api from ".";
import type { Project, ProjectUpdate } from "@/types/projects";

export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await api.get("/projects");
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createProject = async (
  project: ProjectUpdate
): Promise<Project> => {
  try {
    const response = await api.post(`/projects`, project);
    return response.data || {};
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateProject = async (
  projectId: string,
  project: ProjectUpdate
): Promise<Project> => {
  try {
    const response = await api.put(`/projects/${projectId}`, project);
    return response.data || {};
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    await api.delete(`/projects/${projectId}`);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
