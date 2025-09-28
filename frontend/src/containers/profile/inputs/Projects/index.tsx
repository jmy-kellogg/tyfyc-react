import { useState, useCallback, useEffect } from "react";

import Divider from "src/components/Divider";
import ProjectItem from "./ProjectItem";

import { getProjects, createProject, deleteProject } from "@/api/projects";
import type { Project } from "@/types";

interface ProjectsProps {
  lockEdit: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ lockEdit }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  const addNew = async (): Promise<void> => {
    const lastItem = projects[projects.length - 1];
    if (
      lastItem.title ||
      lastItem.description ||
      lastItem.year ||
      lastItem.url
    ) {
      const project = await createProject({
        title: "",
        description: "",
        year: "",
        url: "",
      });
      setProjects([...projects, project]);
    }
  };

  const remove = async (id: string): Promise<void> => {
    await deleteProject(id);
    setProjects(projects.filter((project) => project.id !== id));
  };

  const fetchProjects = useCallback(async () => {
    const projects = await getProjects();
    setProjects(projects);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <>
      <h2>
        <b>Projects </b>
        {!lockEdit && (
          <button
            type="button"
            className="float-right rounded-md bg-indigo-600 m-1 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
              e.stopPropagation();
              addNew();
            }}
          >
            Add Project
          </button>
        )}
      </h2>
      {projects.map((project: Project) => (
        <div key={project.id}>
          <ProjectItem project={project} lockEdit={lockEdit} remove={remove} />
          <Divider />
        </div>
      ))}
    </>
  );
};

export default Projects;
