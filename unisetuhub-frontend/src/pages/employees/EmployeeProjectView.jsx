
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Circle,
  User,
  FolderKanban,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { useProjects } from "../../context/ProjectContext";
import { useTasks } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";

function EmployeeProjectView() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const { projects = [] } = useProjects();
  const { tasks = [] } = useTasks();
  const { currentUser } = useAuth();

  const normalizedProjectId = String(
    projectId || ""
  ).toUpperCase();

  /*
   * =========================================================
   * FIND PROJECT
   * =========================================================
   */

  const project = projects.find((item) => {
    const code = String(item?.code || "").toUpperCase();
    const id = String(item?.id || "").toUpperCase();

    return (
      code === normalizedProjectId ||
      id === normalizedProjectId
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

        <FolderKanban
          size={40}
          className="mx-auto text-slate-400"
        />

        <h1 className="mt-4 text-xl font-semibold">
          Project Not Found
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          The project you are looking for does not exist.
        </p>

        <button
          onClick={() => navigate("/my-projects")}
          className="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Back to My Projects
        </button>

      </div>
    );
  }

  /*
   * =========================================================
   * CHECK EMPLOYEE ACCESS
   * =========================================================
   */

  const userId = String(currentUser?.id || "");

  const members = Array.isArray(project?.members)
    ? project.members
    : [];

  const isMember = members.some(
    (member) =>
      String(member?.id || member) === userId
  );

  /*
   * =========================================================
   * ACCESS DENIED
   * =========================================================
   */

  if (!isMember) {
    return (
      <div className="rounded-xl border border-red-200 bg-white p-10 text-center dark:border-red-900/50 dark:bg-slate-950">

        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
          <User size={22} />
        </div>

        <h1 className="mt-4 text-xl font-semibold">
          Access Denied
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          You are not assigned to this project.
        </p>

        <button
          onClick={() => navigate("/my-projects")}
          className="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Back to My Projects
        </button>

      </div>
    );
  }

  /*
   * =========================================================
   * PROJECT TASKS
   * =========================================================
   *
   * Employee should only see tasks assigned to them.
   *
   */

  const myTasks = tasks.filter((task) => {
    const taskProjectId = String(
      task?.project?.id ||
      task?.projectId ||
      ""
    ).toUpperCase();

    const taskProjectCode = String(
      task?.project?.code || ""
    ).toUpperCase();

    const assigneeId = String(
      task?.assignee?.id ||
      task?.assigneeId ||
      ""
    );

    const projectMatches =
      taskProjectId === normalizedProjectId ||
      taskProjectCode === normalizedProjectId ||
      taskProjectId === String(project?.id || "").toUpperCase() ||
      taskProjectCode === String(project?.code || "").toUpperCase();

    return (
      projectMatches &&
      assigneeId === userId
    );
  });

  /*
   * =========================================================
   * TASK COUNTS
   * =========================================================
   */

  const todo = myTasks.filter(
    (task) =>
      String(task?.status || "").toUpperCase() === "TODO"
  ).length;

  const progress = myTasks.filter(
    (task) =>
      String(task?.status || "").toUpperCase() === "PROGRESS"
  ).length;

  const done = myTasks.filter(
    (task) =>
      String(task?.status || "").toUpperCase() === "DONE"
  ).length;

  /*
   * =========================================================
   * STATUS LABEL
   * =========================================================
   */

  const formatStatus = (status) => {
    switch (String(status || "").toUpperCase()) {
      case "TODO":
        return "To Do";

      case "PROGRESS":
        return "In Progress";

      case "REVIEW":
        return "Review";

      case "DONE":
        return "Completed";

      default:
        return status || "Unknown";
    }
  };

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="space-y-6">

      {/* =================================================
          BACK BUTTON
      ================================================= */}

      <button
        type="button"
        onClick={() => navigate("/my-projects")}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
      >
        <ArrowLeft size={17} />

        Back to My Projects
      </button>

      {/* =================================================
          PROJECT HEADER
      ================================================= */}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

          <div className="flex gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <FolderKanban size={23} />
            </div>

            <div>

              <h1 className="text-2xl font-bold">
                {project?.name || "Unnamed Project"}
              </h1>

              <p className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                {project?.code || "PROJECT"}
              </p>

            </div>

          </div>

          <span className="w-fit rounded-full bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
            {project?.status || "Active"}
          </span>

        </div>

        <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          {project?.description ||
            "No project description available."}
        </p>

      </div>

      {/* =================================================
          MY TASK SUMMARY
      ================================================= */}

      <div>

        <div className="mb-4">

          <h2 className="text-lg font-semibold">
            My Task Summary
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Your tasks in this project.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

          <SummaryCard
            icon={<Circle size={18} />}
            label="My Tasks"
            value={myTasks.length}
          />

          <SummaryCard
            icon={<Clock3 size={18} />}
            label="In Progress"
            value={progress}
          />

          <SummaryCard
            icon={<Circle size={18} />}
            label="To Do"
            value={todo}
          />

          <SummaryCard
            icon={<CheckCircle2 size={18} />}
            label="Completed"
            value={done}
          />

        </div>

      </div>

      {/* =================================================
          MY TASKS
      ================================================= */}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">

        <div className="border-b border-slate-200 p-5 dark:border-slate-800">

          <h2 className="font-semibold">
            My Tasks
          </h2>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Tasks assigned to you in this project.
          </p>

        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">

          {myTasks.length === 0 ? (

            <div className="p-8 text-center">

              <CheckCircle2
                size={32}
                className="mx-auto text-slate-400"
              />

              <p className="mt-3 text-sm font-medium">
                No tasks assigned
              </p>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                You currently have no tasks in this project.
              </p>

            </div>

          ) : (

            myTasks.map((task) => (

              <div
                key={task?.id}
                className="p-5 transition hover:bg-slate-50 dark:hover:bg-slate-900"
              >

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="min-w-0">

                    <h3 className="text-sm font-semibold">
                      {task?.title || "Untitled Task"}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {task?.description ||
                        "No description available."}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">

                      {task?.dueDate && (
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={14} />

                          Due: {task.dueDate}
                        </span>
                      )}

                      {task?.priority && (
                        <span>
                          Priority: {task.priority}
                        </span>
                      )}

                    </div>

                  </div>

                  <span className="w-fit shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {formatStatus(task?.status)}
                  </span>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

/*
 * =========================================================
 * SUMMARY CARD
 * =========================================================
 */

function SummaryCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">

      <div className="flex items-center justify-between">

        <span className="text-slate-400">
          {icon}
        </span>

        <span className="text-2xl font-bold">
          {value}
        </span>

      </div>

      <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
      </p>

    </div>
  );
}

export default EmployeeProjectView;

