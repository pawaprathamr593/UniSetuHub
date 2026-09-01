import { Navigate, Outlet, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProjects } from "../context/ProjectContext";

function ProjectAccessRoute() {
  const { projectId } = useParams();
  const { currentUser } = useAuth();
  const { projects } = useProjects();

  const currentProjectId = projectId?.toUpperCase();

  const project = projects.find(
    (item) => item.code === currentProjectId
  );

  // Project does not exist
  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  // Website admin can access projects
  if (currentUser?.role === "WEBSITE_ADMIN") {
    return <Outlet />;
  }

  // Company Head can access all projects of his company
  if (currentUser?.role === "COMPANY_HEAD") {
    if (project.companyId === currentUser.companyId) {
      return <Outlet />;
    }

    return <Navigate to="/projects" replace />;
  }

  // Project Lead can access only assigned projects
  if (currentUser?.role === "PROJECT_LEAD") {
    const hasAccess =
      currentUser.projectIds?.includes(currentProjectId);

    if (hasAccess) {
      return <Outlet />;
    }

    return <Navigate to="/projects" replace />;
  }

  // Employee can access only assigned projects
  if (currentUser?.role === "EMPLOYEE") {
    const hasAccess =
      currentUser.projectIds?.includes(currentProjectId);

    if (hasAccess) {
      return <Outlet />;
    }

    return <Navigate to="/projects" replace />;
  }

  return <Navigate to="/login" replace />;
}

export default ProjectAccessRoute;