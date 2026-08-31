import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  Clock3,
  FolderKanban,
  ListTodo,
  Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { useTasks } from "../../context/TaskContext";

function ProjectDetails() {
  const { projectId } = useParams();

  const { tasks } = useTasks();

  const projectCode = projectId?.toUpperCase();

  /*
   * =========================================================
   * PROJECT TASKS
   * =========================================================
   */

  const projectTasks = tasks.filter(
    (task) => task.projectId === projectCode
  );

  /*
   * =========================================================
   * TASK STATISTICS
   * =========================================================
   */

  const totalTasks = projectTasks.length;

  const completedTasks = projectTasks.filter(
    (task) => task.status === "done"
  ).length;

  const progress =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  /*
   * =========================================================
   * PROJECT INFORMATION
   * =========================================================
   */

  const project = {
    code: projectCode || "WEB",
    name:
      projectCode === "WEB"
        ? "Website Redesign"
        : projectCode === "MOB"
        ? "Mobile Application"
        : projectCode === "CRM"
        ? "CRM Platform"
        : "Project",

    description:
      projectCode === "WEB"
        ? "Redesign and modernize the company website with a clean and responsive user experience."
        : projectCode === "MOB"
        ? "Develop the company's Android and iOS application."
        : projectCode === "CRM"
        ? "Build an internal customer relationship platform."
        : "Project management workspace.",

    members:
      projectCode === "WEB"
        ? 5
        : projectCode === "MOB"
        ? 4
        : projectCode === "CRM"
        ? 7
        : 0,
  };

  return (
    <div>

      {/* =====================================================
          BACK
      ===================================================== */}

      <Link
        to="/projects"
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
      >
        <ArrowLeft size={16} />
        Back to Projects
      </Link>

      {/* =====================================================
          PROJECT HEADER
      ===================================================== */}

      <div className="mb-8">

        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">

          <div className="flex gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              {project.code}
            </div>

            <div>

              <div className="flex flex-wrap items-center gap-3">

                <h1 className="text-2xl font-bold">
                  {project.name}
                </h1>

                <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                  Active
                </span>

              </div>

              <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                {project.description}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <div className="mb-6 overflow-x-auto border-b border-slate-200 dark:border-slate-800">

        <div className="flex min-w-max gap-6">

          <Link
            to={`/projects/${project.code}`}
            className="border-b-2 border-indigo-600 px-1 pb-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400"
          >
            Overview
          </Link>

          <Link
            to={`/projects/${project.code}/board`}
            className="px-1 pb-3 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            Board
          </Link>

          <Link
            to={`/projects/${project.code}/backlog`}
            className="px-1 pb-3 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            Backlog
          </Link>

          <Link
            to={`/projects/${project.code}/tasks`}
            className="px-1 pb-3 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            Tasks
          </Link>

          <Link
            to={`/projects/${project.code}/members`}
            className="px-1 pb-3 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            Members
          </Link>

        </div>

      </div>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Total Tasks */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Tasks
              </p>

              <p className="mt-2 text-2xl font-bold">
                {totalTasks}
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <ListTodo size={20} />
            </div>

          </div>

        </div>

        {/* Completed */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Completed
              </p>

              <p className="mt-2 text-2xl font-bold">
                {completedTasks}
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400">
              <CheckCircle2 size={20} />
            </div>

          </div>

        </div>

        {/* Members */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Members
              </p>

              <p className="mt-2 text-2xl font-bold">
                {project.members}
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
              <Users size={20} />
            </div>

          </div>

        </div>

        {/* Progress */}

        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Progress
              </p>

              <p className="mt-2 text-2xl font-bold">
                {progress}%
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
              <BarChart3 size={20} />
            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="mt-6 grid gap-6 lg:grid-cols-3">

        {/* Progress */}

        <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2 dark:border-slate-800 dark:bg-slate-900">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="font-semibold">
                Project Progress
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Overall completion of project tasks.
              </p>

            </div>

            <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
              {progress}%
            </span>

          </div>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">

            <div
              className="h-full rounded-full bg-indigo-600 transition-all"
              style={{ width: `${progress}%` }}
            />

          </div>

          <div className="mt-3 flex justify-between text-xs text-slate-400">

            <span>
              {completedTasks} completed
            </span>

            <span>
              {totalTasks - completedTasks} remaining
            </span>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

          <h2 className="font-semibold">
            Quick Actions
          </h2>

          <div className="mt-4 space-y-2">

            <Link
              to={`/projects/${project.code}/board`}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <FolderKanban
                size={18}
                className="text-indigo-500"
              />
              Open Board
            </Link>

            <Link
              to={`/projects/${project.code}/tasks`}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <ListTodo
                size={18}
                className="text-indigo-500"
              />
              View Tasks
            </Link>

            <Link
              to={`/projects/${project.code}/members`}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <Users
                size={18}
                className="text-indigo-500"
              />
              Manage Members
            </Link>

          </div>

        </div>

      </div>

      {/* =====================================================
          RECENT TASK ACTIVITY
      ===================================================== */}

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

        <div className="flex items-center gap-2">

          <Clock3
            size={18}
            className="text-indigo-500"
          />

          <h2 className="font-semibold">
            Project Tasks
          </h2>

        </div>

        <div className="mt-5 space-y-4">

          {projectTasks.length > 0 ? (

            projectTasks.slice(0, 5).map((task) => (

              <div
                key={task.id}
                className="flex items-center justify-between gap-4"
              >

                <div className="flex items-center gap-3">

                  <div
                    className={`h-2 w-2 rounded-full ${
                      task.status === "done"
                        ? "bg-green-500"
                        : task.status === "progress"
                        ? "bg-blue-500"
                        : task.status === "review"
                        ? "bg-orange-500"
                        : "bg-slate-400"
                    }`}
                  />

                  <div>

                    <p className="text-sm">

                      <span className="font-medium">
                        {task.id}
                      </span>

                      {" - "}

                      {task.title}

                    </p>

                    <p className="mt-1 text-xs capitalize text-slate-400">
                      {task.status === "progress"
                        ? "In Progress"
                        : task.status}
                    </p>

                  </div>

                </div>

                <span className="text-xs font-medium text-slate-400">
                  {task.assignee}
                </span>

              </div>

            ))

          ) : (

            <p className="text-sm text-slate-500">
              No tasks have been created for this project yet.
            </p>

          )}

        </div>

      </div>

    </div>
  );
}

export default ProjectDetails;