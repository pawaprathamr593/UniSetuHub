import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

/*
 * =========================================================
 * INITIAL PROJECTS
 * =========================================================
 */

const initialProjects = [
  {
    id: "WEB",
    code: "WEB",
    name: "Website Redesign",
    description: "Redesign and modernize the company website.",
    type: "Software Development",
    visibility: "Company members",
  },

  {
    id: "MOB",
    code: "MOB",
    name: "Mobile Application",
    description: "Develop the company's Android and iOS application.",
    type: "Software Development",
    visibility: "Company members",
  },

  {
    id: "CRM",
    code: "CRM",
    name: "CRM Platform",
    description: "Build an internal customer relationship platform.",
    type: "Software Development",
    visibility: "Company members",
  },
];

/*
 * =========================================================
 * PROJECT PROVIDER
 * =========================================================
 */

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(initialProjects);

  /*
   * =========================================================
   * ADD PROJECT
   * =========================================================
   */

  const addProject = (projectData) => {
    const projectCode = projectData.code.trim().toUpperCase();

    const newProject = {
      id: projectCode,
      code: projectCode,
      name: projectData.name.trim(),
      description: projectData.description || "",
      type: projectData.type || "Software Development",
      visibility: projectData.visibility || "Company members",
    };

    setProjects((current) => [
      ...current,
      newProject,
    ]);
  };

  /*
   * =========================================================
   * UPDATE PROJECT
   * =========================================================
   */

  const updateProject = (updatedProject) => {
    setProjects((current) =>
      current.map((project) =>
        project.id === updatedProject.id
          ? {
              ...project,
              ...updatedProject,
            }
          : project
      )
    );
  };

  /*
   * =========================================================
   * DELETE PROJECT
   * =========================================================
   */

  const deleteProject = (projectId) => {
    setProjects((current) =>
      current.filter(
        (project) => project.id !== projectId
      )
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

/*
 * =========================================================
 * USE PROJECTS HOOK
 * =========================================================
 */

export function useProjects() {
  return useContext(ProjectContext);
}