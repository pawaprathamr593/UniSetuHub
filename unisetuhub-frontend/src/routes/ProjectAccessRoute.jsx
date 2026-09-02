import { Navigate, Outlet, useParams } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useProjects } from "../context/ProjectContext";

function ProjectAccessRoute() {
  const { projectId } = useParams();

  const { currentUser } = useAuth();
  const { projects = [] } = useProjects();

  /*
   * =========================================================
   * NORMALIZE VALUES
   * =========================================================
   */

  const normalize = (value) =>
    String(value || "")
      .trim()
      .toUpperCase();

  const currentProjectId = normalize(projectId);

  /*
   * =========================================================
   * FIND PROJECT
   * =========================================================
   *
   * Support both:
   *
   * /projects/PROJ001
   * /projects/123
   *
   */

  const project = projects.find((item) => {
    return (
      normalize(item?.code) === currentProjectId ||
      normalize(item?.id) === currentProjectId
    );
  });

  /*
   * =========================================================
   * PROJECT NOT FOUND
   * =========================================================
   */

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  /*
   * =========================================================
   * USER ROLE
   * =========================================================
   */

  const role = currentUser?.role;

  /*
   * =========================================================
   * WEBSITE ADMIN
   * =========================================================
   *
   * Website Admin can access every project.
   */

  if (role === "WEBSITE_ADMIN") {
    return <Outlet />;
  }

  /*
   * =========================================================
   * COMPANY HEAD
   * =========================================================
   *
   * Company Head can access projects
   * belonging to their company.
   */

  if (role === "COMPANY_HEAD") {
    const projectCompanyId = normalize(
      project?.companyId ||
        project?.company?.id
    );

    const userCompanyId = normalize(
      currentUser?.companyId ||
        currentUser?.company?.id
    );

    if (
      projectCompanyId &&
      userCompanyId &&
      projectCompanyId === userCompanyId
    ) {
      return <Outlet />;
    }

    return <Navigate to="/projects" replace />;
  }

  /*
   * =========================================================
   * PROJECT LEAD / EMPLOYEE
   * =========================================================
   *
   * Both can access only projects assigned to them.
   *
   * IMPORTANT:
   *
   * Project Lead and Employee are NOT treated
   * as the same role here.
   *
   * This route only checks whether they can ENTER
   * the project.
   *
   * Their actual permissions are handled separately.
   */

  if (
    role === "PROJECT_LEAD" ||
    role === "EMPLOYEE"
  ) {
    const userProjectIds = Array.isArray(
      currentUser?.projectIds
    )
      ? currentUser.projectIds
      : [];

    const hasAccess = userProjectIds.some(
      (id) =>
        normalize(id) ===
          normalize(project?.id) ||
        normalize(id) ===
          normalize(project?.code)
    );

    /*
     * Also support project membership.
     *
     * This is useful if the backend stores:
     *
     * project.members
     */

    const isMember = Array.isArray(
      project?.members
    )
      ? project.members.some((member) => {
          const memberId = normalize(
            member?.id || member
          );

          return (
            memberId ===
            normalize(currentUser?.id)
          );
        })
      : false;

    if (hasAccess || isMember) {
      return <Outlet />;
    }

    return <Navigate to="/projects" replace />;
  }

  /*
   * =========================================================
   * UNKNOWN ROLE
   * =========================================================
   */

  return <Navigate to="/login" replace />;
}

export default ProjectAccessRoute;