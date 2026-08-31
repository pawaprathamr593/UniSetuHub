import { NavLink, Outlet, useParams } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";

function ProjectLayout() {
  const { projectId } = useParams();
  const { projects } = useProjects();

  const currentProjectId = projectId?.toUpperCase();

  const project = projects.find(
    (item) => item.code === currentProjectId
  );

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
          The project "{currentProjectId}" does not exist.
        </p>
      </div>
    );
  }

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

          <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            {project.code}
          </span>

        </div>

        <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
          {project.description}
        </p>

      </div>

      {/* =================================================
          COMMON PROJECT NAVIGATION
      ================================================= */}

      <div className="border-b border-slate-200 dark:border-slate-800">

        <nav className="flex gap-8 overflow-x-auto">

          {/* Overview */}

          <NavLink
            to={`/projects/${project.code}`}
            end
            className={({ isActive }) =>
              `whitespace-nowrap border-b-2 px-1 pb-4 pt-2 text-base font-semibold transition ${isActive
                ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }`
            }
          >
            Overview
          </NavLink>

          {/* Board */}

          <NavLink
            to={`/projects/${project.code}/board`}
            className={({ isActive }) =>
              `whitespace-nowrap border-b-2 px-1 pb-4 pt-2 text-base font-semibold transition ${isActive
                ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }`
            }
          >
            Board
          </NavLink>

          {/* Tasks */}

          <NavLink
            to={`/projects/${project.code}/tasks`}
            className={({ isActive }) =>
              `whitespace-nowrap border-b-2 px-1 pb-4 pt-2 text-base font-semibold transition ${isActive
                ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }`
            }
          >
            Tasks
          </NavLink>

          {/* Backlog */}

          <NavLink
            to={`/projects/${project.code}/backlog`}
            className={({ isActive }) =>
              `whitespace-nowrap border-b-2 px-1 pb-4 pt-2 text-base font-semibold transition ${isActive
                ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }`
            }
          >
            Backlog
          </NavLink>

          {/* Members */}

          <NavLink
            to={`/projects/${project.code}/members`}
            className={({ isActive }) =>
              `whitespace-nowrap border-b-2 px-1 pb-4 pt-2 text-base font-semibold transition ${isActive
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