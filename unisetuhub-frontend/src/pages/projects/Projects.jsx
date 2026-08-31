import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  CheckCircle2,
  Clock3,
  FolderKanban,
  Plus,
  Search,
  Users,
} from "lucide-react";

import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";

function Projects() {
  const { tasks } = useTasks();
  const { projects } = useProjects();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  /*
   * =========================================================
   * PROJECT STATISTICS
   * =========================================================
   */

  const projectsWithStats = useMemo(() => {
    return projects.map((project) => {
      const projectTasks = tasks.filter(
        (task) =>
          task.projectId === project.code.toUpperCase()
      );

      const totalTasks = projectTasks.length;

      const completedTasks = projectTasks.filter(
        (task) => task.status === "done"
      ).length;

      const progress =
        totalTasks > 0
          ? Math.round(
              (completedTasks / totalTasks) * 100
            )
          : 0;

      return {
        ...project,
        code: project.code.toUpperCase(),
        tasks: totalTasks,
        completed: completedTasks,
        progress,
        status:
          totalTasks > 0 &&
          completedTasks === totalTasks
            ? "completed"
            : "active",
      };
    });
  }, [projects, tasks]);

  /*
   * =========================================================
   * SEARCH + STATUS FILTER
   * =========================================================
   */

  const filteredProjects = projectsWithStats.filter(
    (project) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        project.name
          .toLowerCase()
          .includes(searchText) ||
        project.code
          .toLowerCase()
          .includes(searchText) ||
        project.description
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "all" ||
        project.status === statusFilter;

      return matchesSearch && matchesStatus;
    }
  );

  return (
    <div>

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <FolderKanban size={20} />
            </div>

            <h1 className="text-2xl font-bold">
              Projects
            </h1>

          </div>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage and organize your company's projects.
          </p>

        </div>

        <Link
          to="/projects/create"
          className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          <Plus size={18} />
          Create Project
        </Link>

      </div>

      {/* =================================================
          SEARCH + FILTER
      ================================================= */}

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search projects..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-900 dark:placeholder:text-slate-600"
          />

        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none dark:border-slate-800 dark:bg-slate-900"
        >
          <option value="all">
            All Projects
          </option>

          <option value="active">
            Active
          </option>

          <option value="completed">
            Completed
          </option>
        </select>

      </div>

      {/* =================================================
          PROJECT CARDS
      ================================================= */}

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">

        {filteredProjects.length > 0 ? (

          filteredProjects.map((project) => (

            <div
              key={project.code}
              className="rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >

              {/* Card Header */}

              <div className="flex items-start justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  {project.code}
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    project.status === "completed"
                      ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                  }`}
                >
                  {project.status === "completed"
                    ? "Completed"
                    : "Active"}
                </span>

              </div>

              {/* Project Info */}

              <div className="mt-5">

                <h2 className="text-lg font-semibold">
                  {project.name}
                </h2>

                <p className="mt-1 min-h-10 text-sm text-slate-500 dark:text-slate-400">
                  {project.description}
                </p>

              </div>

              {/* Stats */}

              <div className="mt-5 grid grid-cols-2 gap-3">

                {/* Members */}

                <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">

                  <div className="flex items-center gap-2 text-slate-400">

                    <Users size={15} />

                    <span className="text-xs">
                      Members
                    </span>

                  </div>

                  <p className="mt-1 font-semibold">
                    {project.members || 0}
                  </p>

                </div>

                {/* Tasks */}

                <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">

                  <div className="flex items-center gap-2 text-slate-400">

                    <CheckCircle2 size={15} />

                    <span className="text-xs">
                      Tasks
                    </span>

                  </div>

                  <p className="mt-1 font-semibold">
                    {project.tasks}
                  </p>

                </div>

              </div>

              {/* Progress */}

              <div className="mt-5">

                <div className="mb-2 flex items-center justify-between">

                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">

                    <Clock3 size={14} />

                    Progress

                  </div>

                  <span className="text-xs font-semibold">
                    {project.progress}%
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">

                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />

                </div>

              </div>

              {/* Footer */}

              <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800">

                <span className="text-xs text-slate-400">
                  {project.completed} of {project.tasks} completed
                </span>

                <Link
                  to={`/projects/${project.code}`}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                  Open Project →
                </Link>

              </div>

            </div>

          ))

        ) : (

          /* =================================================
             EMPTY STATE
          ================================================= */

          <div className="col-span-full rounded-xl border border-dashed border-slate-300 py-12 text-center dark:border-slate-700">

            <FolderKanban
              size={32}
              className="mx-auto text-slate-400"
            />

            <p className="mt-3 text-sm font-medium">
              No projects found
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Try changing your search or project filter.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default Projects;