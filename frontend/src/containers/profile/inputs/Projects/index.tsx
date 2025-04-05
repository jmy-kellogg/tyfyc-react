import { useState, useCallback, useEffect } from "react";

import Divider from "src/components/Divider";
import ProjectItem from "./ProjectItem";

import { getProjects, createProject, deleteProject } from "@/api/projects";
import type { Project } from "@/types/projects";

interface Props {
  editAll: boolean;
  lockEdit: boolean;
}

function Projects({ editAll, lockEdit }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAdd, setShowAdd] = useState(false);

  const addNew = async () => {
    const lastItem = projects[projects.length - 1];
    if (
      lastItem.title ||
      lastItem.description ||
      lastItem.year ||
      lastItem.url
    ) {
      try {
        const project = await createProject({
          title: "",
          description: "",
          year: "",
          url: "",
        });
        setProjects([...projects, project]);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter((project) => project.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProjects = useCallback(async () => {
    try {
      const projects = await getProjects();
      setProjects(projects);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <>
      <div
        onMouseEnter={() => setShowAdd(true)}
        onMouseLeave={() => setShowAdd(false)}
      >
        <h2>
          <b>Projects </b>
        </h2>
        {projects.map((project: Project) => (
          <div key={project.id}>
            <ProjectItem
              project={project}
              editAll={editAll}
              lockEdit={lockEdit}
              remove={remove}
            />
            <Divider />
          </div>
        ))}
        {!lockEdit && (editAll || showAdd) && (
          <button
            type="button"
            className="rounded-md bg-indigo-600 m-1 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={addNew}
          >
            Add Job
          </button>
        )}
      </div>
    </>
  );
}

export default Projects;
