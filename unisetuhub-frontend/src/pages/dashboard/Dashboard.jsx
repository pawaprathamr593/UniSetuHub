import {
  CheckCircle2,
  Clock3,
  FolderKanban,
  ListTodo,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";
import { ROLES } from "../../constants/roles";

import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { currentUser } = useAuth();
  const { tasks = [] } = useTasks();
  const { projects = [] } = useProjects();

  const navigate = useNavigate();

  /*
   * =========================================================
   * EMPLOYEE TASKS
   * =========================================================
   */

  const myTasks = tasks.filter(
    (task) =>
      String(task?.assignee?.id || "") ===
      String(currentUser?.id || "")
  );

  /*
   * =========================================================
   * EMPLOYEE PROJECTS
   * =========================================================
   */

  const myProjects = projects.filter((project) => {
    const projectId = String(project?.id || "").toUpperCase();

    return (
      currentUser?.projectIds?.some(
        (id) =>
          String(id).toUpperCase() === projectId
      ) ||
      project?.members?.some(
        (member) =>
          String(member?.id || "") ===
          String(currentUser?.id || "")
      )
    );
  });

  /*
   * =========================================================
   * TASK COUNTS
   * =========================================================
   */

  const todoTasks = myTasks.filter(
    (task) =>
      String(task?.status || "").toUpperCase() ===
      "TODO"
  ).length;

  const inProgressTasks = myTasks.filter(
    (task) =>
      String(task?.status || "").toUpperCase() ===
      "IN_PROGRESS"
  ).length;

  const reviewTasks = myTasks.filter(
    (task) =>
      String(task?.status || "").toUpperCase() ===
      "REVIEW"
  ).length;

  const completedTasks = myTasks.filter(
    (task) =>
      ["DONE", "COMPLETED", "ACCEPTED"].includes(
        String(task?.status || "").toUpperCase()
      )
  ).length;

  /*
   * =========================================================
   * NAME
   * =========================================================
   */

  const employeeName =
    currentUser?.name ||
    `${currentUser?.firstName || ""} ${
      currentUser?.surname || ""
    }`.trim() ||
    "Employee";

  /*
   * =========================================================
   * STATUS LABEL
   * =========================================================
   */

  const getStatusLabel = (status) => {
    switch (
      String(status || "").toUpperCase()
    ) {
      case "TODO":
        return "To Do";

      case "IN_PROGRESS":
        return "In Progress";

      case "REVIEW":
        return "Review";

      case "DONE":
      case "COMPLETED":
      case "ACCEPTED":
        return "Completed";

      default:
        return status || "Unknown";
    }
  };

  /*
   * =========================================================
   * STATUS STYLE
   * =========================================================
   */

  const getStatusStyle = (status) => {
    switch (
      String(status || "").toUpperCase()
    ) {
      case "TODO":
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300";

      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400";

      case "REVIEW":
        return "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400";

      case "DONE":
      case "COMPLETED":
      case "ACCEPTED":
        return "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  /*
   * =========================================================
   * NON-EMPLOYEE DASHBOARD
   * =========================================================
   *
   * For now, keep your existing dashboard for
   * Company Head / Project Lead / Website Admin.
   *
   */

  if (
    currentUser?.role !==
    ROLES.EMPLOYEE
  ) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Here's what's happening in your workspace.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <DashboardCard
            label="Projects"
            value="12"
          />

          <DashboardCard
            label="Active Tasks"
            value="48"
          />

          <DashboardCard
            label="Employees"
            value="36"
          />

          <DashboardCard
            label="Completed"
            value="127"
          />

        </div>
      </div>
    );
  }

  /*
   * =========================================================
   * EMPLOYEE DASHBOARD
   * =========================================================
   */

  return (
    <div className="space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div>
        <h1 className="text-2xl font-bold">
          Welcome, {employeeName}
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Here's an overview of your assigned
          projects and tasks.
        </p>
      </div>

      {/* =================================================
          SUMMARY
      ================================================= */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <DashboardCard
          icon={
            <FolderKanban size={19} />
          }
          label="My Projects"
          value={myProjects.length}
        />

        <DashboardCard
          icon={
            <ListTodo size={19} />
          }
          label="To Do"
          value={todoTasks}
        />

        <DashboardCard
          icon={
            <Clock3 size={19} />
          }
          label="In Progress"
          value={inProgressTasks}
        />

        <DashboardCard
          icon={
            <CheckCircle2 size={19} />
          }
          label="Completed"
          value={completedTasks}
        />

      </div>

      {/* =================================================
          MY PROJECTS
      ================================================= */}

      <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">

        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">

          <div>
            <h2 className="font-semibold">
              My Projects
            </h2>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Projects you are currently assigned to.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/projects")
            }
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            View All
            <ArrowRight size={14} />
          </button>

        </div>

        {myProjects.length > 0 ? (

          <div className="divide-y divide-slate-200 dark:divide-slate-800">

            {myProjects
              .slice(0, 5)
              .map((project) => (

                <div
                  key={project.id}
                  className="flex items-center justify-between px-5 py-4 transition hover:bg-slate-50 dark:hover:bg-slate-900/50"
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                      <FolderKanban size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        {project.name}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        {project.code || project.id}
                      </p>
                    </div>

                  </div>

                  <span className="text-xs text-slate-400">
                    {myTasks.filter(
                      (task) =>
                        String(
                          task?.project?.id
                        ) ===
                        String(project.id)
                    ).length}{" "}
                    tasks
                  </span>

                </div>

              ))}

          </div>

        ) : (

          <div className="px-5 py-10 text-center">

            <FolderKanban
              size={30}
              className="mx-auto text-slate-400"
            />

            <p className="mt-3 text-sm font-medium">
              No projects assigned
            </p>

            <p className="mt-1 text-xs text-slate-500">
              You currently don't have any
              assigned projects.
            </p>

          </div>

        )}

      </div>

      {/* =================================================
          MY TASKS
      ================================================= */}

      <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">

        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">

          <div>
            <h2 className="font-semibold">
              My Tasks
            </h2>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Tasks assigned specifically to you.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/tasks")
            }
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            View All
            <ArrowRight size={14} />
          </button>

        </div>

        {myTasks.length > 0 ? (

          <div className="divide-y divide-slate-200 dark:divide-slate-800">

            {myTasks
              .slice(0, 5)
              .map((task) => (

                <div
                  key={task.id}
                  className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                >

                  <div className="min-w-0">

                    <p className="truncate text-sm font-semibold">
                      {task.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {task.project?.name ||
                        task.project?.code ||
                        "Project"}
                    </p>

                  </div>

                  <div className="flex items-center gap-3">

                    {task.dueDate && (
                      <span className="text-xs text-slate-400">
                        Due {task.dueDate}
                      </span>
                    )}

                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusStyle(
                        task.status
                      )}`}
                    >
                      {getStatusLabel(
                        task.status
                      )}
                    </span>

                  </div>

                </div>

              ))}

          </div>

        ) : (

          <div className="px-5 py-10 text-center">

            <CheckCircle2
              size={30}
              className="mx-auto text-slate-400"
            />

            <p className="mt-3 text-sm font-medium">
              No tasks assigned
            </p>

            <p className="mt-1 text-xs text-slate-500">
              You currently don't have any
              assigned tasks.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

/*
 * =========================================================
 * DASHBOARD CARD
 * =========================================================
 */

function DashboardCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">

      <div className="flex items-center justify-between">

        {icon && (
          <span className="text-indigo-600 dark:text-indigo-400">
            {icon}
          </span>
        )}

        <span className="text-3xl font-bold">
          {value}
        </span>

      </div>

      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        {label}
      </p>

    </div>
  );
}

export default Dashboard;