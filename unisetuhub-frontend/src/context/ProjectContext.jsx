import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const ProjectContext = createContext();

const API_URL = "http://localhost:8080";

export function ProjectProvider({ children }) {

  const { user } = useAuth();

  const [projects, setProjects] = useState([]);

  /*
   * =========================================================
   * GET ALL PROJECTS
   * =========================================================
   */

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/projects`);

      if (!response.ok) {
        throw new Error("Failed to fetch projects.");
      }

      const data = await response.json();

      setProjects(data);

      return data;
    } catch (error) {
      console.error("Fetch projects error:", error);
      return [];
    }
  };

  /*
   * =========================================================
   * FETCH PROJECTS WHEN CONTEXT LOADS
   * =========================================================
   */

  useEffect(() => {
    fetchProjects();
  }, []);

  /*
   * =========================================================
   * ADD PROJECT
   * =========================================================
   */

  const addProject = async ({
    code,
    name,
    description,
    type,
    visibility,
    companyId,
    projectLeaderId,
    memberIds = [],
  }) => {
    try {

      /*
       * =====================================================
       * VALIDATION
       * =====================================================
       */

      if (
        !code?.trim() ||
        !name?.trim() ||
        !companyId
      ) {
        return {
          success: false,
          message:
            "Project code, name and company are required.",
        };
      }

      /*
       * =====================================================
       * FINAL MEMBER IDS
       * =====================================================
       *
       * Project leader is always included as a member.
       *
       */

      const finalMemberIds = [
        ...new Set([
          ...memberIds,
          projectLeaderId,
        ].filter(Boolean)),
      ];

      /*
       * =====================================================
       * CREATE PROJECT OBJECT
       * =====================================================
       */

      const project = {
        id: code.trim().toUpperCase(),

        code: code.trim().toUpperCase(),

        name: name.trim(),

        description:
          description?.trim() || "",

        type:
          type || "Software Development",

        visibility:
          visibility || "Company members",

        /*
         * Company
         */

        company: {
          id: companyId,
        },

        /*
         * Project Leader
         */

        projectLeader:
          projectLeaderId
            ? {
                id: projectLeaderId,
              }
            : null,

        /*
         * Project Members
         */

        members: finalMemberIds.map(
          (memberId) => ({
            id: memberId,
          })
        ),
      };

      console.log(
        "Creating project:",
        project
      );

      /*
       * =====================================================
       * API REQUEST
       * =====================================================
       */

      const response = await fetch(
        `${API_URL}/projects`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(project),
        }
      );

      /*
       * =====================================================
       * BACKEND ERROR
       * =====================================================
       */

      if (!response.ok) {
        let message =
          "Failed to create project.";

        try {
          const errorData =
            await response.json();

          message =
            errorData?.message ||
            errorData?.error ||
            message;
        } catch {
          try {
            const text =
              await response.text();

            if (text) {
              message = text;
            }
          } catch {
            // Ignore response parsing error
          }
        }

        return {
          success: false,
          message,
        };
      }

      /*
       * =====================================================
       * CREATED PROJECT
       * =====================================================
       */

      const createdProject =
        await response.json();

      /*
       * Refresh project list
       */

      await fetchProjects();

      return {
        success: true,
        project: createdProject,
      };

    } catch (error) {

      console.error(
        "Add project error:",
        error
      );

      return {
        success: false,
        message:
          "Unable to connect to the server.",
      };
    }
  };

  /*
   * =========================================================
   * UPDATE PROJECT
   * =========================================================
   */

  const updateProject = async (
    id,
    {
      code,
      name,
      description,
      type,
      visibility,
      companyId,
      projectLeaderId,
      memberIds = [],
    }
  ) => {
    try {

      /*
       * =====================================================
       * FINAL MEMBER IDS
       * =====================================================
       *
       * Project leader should always remain a member.
       *
       */

      const finalMemberIds = [
        ...new Set([
          ...memberIds,
          projectLeaderId,
        ].filter(Boolean)),
      ];

      /*
       * =====================================================
       * UPDATE PROJECT OBJECT
       * =====================================================
       */

      const project = {
        id,

        code:
          code?.trim().toUpperCase(),

        name:
          name?.trim(),

        description:
          description?.trim() || "",

        type,

        visibility,

        /*
         * Company
         */

        company: companyId
          ? {
              id: companyId,
            }
          : null,

        /*
         * Project Leader
         */

        projectLeader:
          projectLeaderId
            ? {
                id: projectLeaderId,
              }
            : null,

        /*
         * Project Members
         */

        members: finalMemberIds.map(
          (memberId) => ({
            id: memberId,
          })
        ),
      };

      console.log(
        "Updating project:",
        project
      );

      /*
       * =====================================================
       * LOGGED-IN USER
       * =====================================================
       */

      const changedById = user?.id || null;

      /*
       * =====================================================
       * API REQUEST
       * =====================================================
       *
       * PUT /projects/{id}?changedById={loggedInUserId}
       *
       */

      const url = new URL(
        `${API_URL}/projects/${id}`
      );

      if (changedById) {
        url.searchParams.set(
          "changedById",
          changedById
        );
      }

      const response = await fetch(
        url.toString(),
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(project),
        }
      );

      /*
       * =====================================================
       * BACKEND ERROR
       * =====================================================
       */

      if (!response.ok) {
        let message =
          "Failed to update project.";

        try {
          const errorData =
            await response.json();

          message =
            errorData?.message ||
            errorData?.error ||
            message;

        } catch {

          try {
            const text =
              await response.text();

            if (text) {
              message = text;
            }

          } catch {
            // Ignore response parsing error
          }
        }

        return {
          success: false,
          message,
        };
      }

      /*
       * =====================================================
       * UPDATED PROJECT
       * =====================================================
       */

      const updatedProject =
        await response.json();

      await fetchProjects();

      return {
        success: true,
        project: updatedProject,
      };

    } catch (error) {

      console.error(
        "Update project error:",
        error
      );

      return {
        success: false,
        message:
          "Unable to connect to the server.",
      };
    }
  };

  /*
   * =========================================================
   * DELETE PROJECT
   * =========================================================
   */

  const deleteProject = async (
    projectId
  ) => {
    try {

      const response = await fetch(
        `${API_URL}/projects/${projectId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {

        let message =
          "Failed to delete project.";

        try {

          const errorData =
            await response.json();

          message =
            errorData?.message ||
            errorData?.error ||
            message;

        } catch {
          // Ignore response parsing error
        }

        return {
          success: false,
          message,
        };
      }

      setProjects((current) =>
        current.filter(
          (project) =>
            String(project.id) !==
            String(projectId)
        )
      );

      return {
        success: true,
      };

    } catch (error) {

      console.error(
        "Delete project error:",
        error
      );

      return {
        success: false,
        message:
          "Unable to connect to the server.",
      };
    }
  };

  /*
   * =========================================================
   * GET PROJECT BY ID
   * =========================================================
   */

  const getProjectById = (projectId) => {
    return projects.find(
      (project) =>
        String(project.id) ===
        String(projectId)
    );
  };

  /*
   * =========================================================
   * GET PROJECTS BY COMPANY
   * =========================================================
   */

  const getCompanyProjects = (
    companyId
  ) => {
    return projects.filter(
      (project) =>
        String(project.company?.id) ===
        String(companyId)
    );
  };

  /*
   * =========================================================
   * GET PROJECTS BY LEADER
   * =========================================================
   */

  const getProjectsByLeader = (
    employeeId
  ) => {
    return projects.filter(
      (project) =>
        String(project.projectLeader?.id) ===
        String(employeeId)
    );
  };

  /*
   * =========================================================
   * GET PROJECTS BY MEMBER
   * =========================================================
   */

  const getProjectsByMember = (
    employeeId
  ) => {
    return projects.filter((project) =>
      project.members?.some(
        (member) =>
          String(member.id) ===
          String(employeeId)
      )
    );
  };

  /*
   * =========================================================
   * CHECK PROJECT LEADER
   * =========================================================
   */

  const isProjectLeader = (
    projectId,
    employeeId
  ) => {

    const project =
      getProjectById(projectId);

    if (!project) {
      return false;
    }

    return (
      String(project.projectLeader?.id) ===
      String(employeeId)
    );
  };

  /*
   * =========================================================
   * CHECK PROJECT MEMBER
   * =========================================================
   */

  const isProjectMember = (
    projectId,
    employeeId
  ) => {

    const project =
      getProjectById(projectId);

    if (!project) {
      return false;
    }

    return Boolean(
      project.members?.some(
        (member) =>
          String(member.id) ===
          String(employeeId)
      )
    );
  };

  /*
   * =========================================================
   * CONTEXT
   * =========================================================
   */

  return (
    <ProjectContext.Provider
      value={{
        projects,

        fetchProjects,

        addProject,

        updateProject,

        deleteProject,

        getProjectById,

        getCompanyProjects,

        getProjectsByLeader,

        getProjectsByMember,

        isProjectLeader,

        isProjectMember,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  return useContext(ProjectContext);
}