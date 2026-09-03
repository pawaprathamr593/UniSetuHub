import { NavLink, Outlet, useParams } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";

function ProjectLayout() {
  const { projectId } = useParams();
  const { projects = [] } = useProjects();



  /*
   * =========================================================
   * FIND CURRENT PROJECT
   * =========================================================
   *
   * Projects.jsx currently sends:
   *
   * /projects/{project.id}
   *
   * Therefore we first try database ID.
   *
   * We also support project.code so both URLs work:
   *
   * /projects/1
   * /projects/PRJ001
   */

  const project = projects.find((item) => {
    const itemId = String(item?.id || "");
    const itemCode = String(item?.code || "").toUpperCase();
    const urlValue = String(projectId || "");

    return (
      itemId === urlValue ||
      itemCode === urlValue.toUpperCase()
    );
  });



  /*
   * =========================================================
   * PROJECT NOT FOUND
   * =========================================================
   */

  if (!project) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-950">

        <h1 className="text-xl font-semibold">
          Project Not Found
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          The project "{projectId}" could not be found.
        </p>

        <p className="mt-3 text-xs text-slate-400">
          Check the browser console for the loaded projects.
        </p>

      </div>
    );
  }

  /*
   * =========================================================
   * PROJECT URL
   * =========================================================
   *
   * Use the database ID consistently.
   */

  const projectUrl = `/projects/${project.id}`;

  return (
    <div className="space-y-6">

      {/* =================================================
          PROJECT HEADER
      ================================================= */}

      <div>

        <div className="flex items-center gap-3">

          <h1 className="text-3xl font-bold">
            {project.name}
          </h1>

          {project.code && (
            <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {project.code}
            </span>
          )}

        </div>

        <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
          {project.description ||
            "No project description available."}
        </p>

      </div>

      {/* =================================================
          PROJECT NAVIGATION
      ================================================= */}

      <div className="border-b border-slate-200 dark:border-slate-800">

        <nav className="flex gap-8 overflow-x-auto">

          {/* Overview */}

          <NavLink
            to={projectUrl}
            end
            className={({ isActive }) =>
              `whitespace-nowrap border-b-2 px-1 pb-4 pt-2 text-base font-semibold transition ${
                isActive
                  ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                  : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }`
            }
          >
            Overview
          </NavLink>

          {/* Board */}

          <NavLink
            to={`${projectUrl}/board`}
            className={({ isActive }) =>
              `whitespace-nowrap border-b-2 px-1 pb-4 pt-2 text-base font-semibold transition ${
                isActive
                  ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                  : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }`
            }
          >
            Board
          </NavLink>

          {/* Tasks */}

          <NavLink
            to={`${projectUrl}/tasks`}
            className={({ isActive }) =>
              `whitespace-nowrap border-b-2 px-1 pb-4 pt-2 text-base font-semibold transition ${
                isActive
                  ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                  : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }`
            }
          >
            Tasks
          </NavLink>

          {/* Backlog */}

          <NavLink
            to={`${projectUrl}/backlog`}
            className={({ isActive }) =>
              `whitespace-nowrap border-b-2 px-1 pb-4 pt-2 text-base font-semibold transition ${
                isActive
                  ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                  : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }`
            }
          >
            Backlog
          </NavLink>

          {/* Members */}

          <NavLink
            to={`${projectUrl}/members`}
            className={({ isActive }) =>
              `whitespace-nowrap border-b-2 px-1 pb-4 pt-2 text-base font-semibold transition ${
                isActive
                  ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                  : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }`
            }
          >
            Members
          </NavLink>

        </nav>

      </div>

      {/* =================================================
          CURRENT PROJECT PAGE
      ================================================= */}

      <Outlet />

    </div>
  );
}

export default ProjectLayout;