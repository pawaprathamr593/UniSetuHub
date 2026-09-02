import {
  CheckCircle2,
  Clock3,
  Circle,
  AlertCircle,
  Search,
  Filter,
  X,
  Play,
  Send,
} from "lucide-react";

import { useState } from "react";

import { useTasks } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";

function EmployeeTasks() {
  const {
    tasks = [],
    startTask,
    submitTask,
  } = useTasks();

  const { currentUser } = useAuth();

  /*
   * =========================================================
   * FILTER STATE
   * =========================================================
   */

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [projectFilter, setProjectFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  /*
   * =========================================================
   * ACTION STATE
   * =========================================================
   */

  const [actionLoading, setActionLoading] = useState("");

  /*
   * =========================================================
   * CURRENT USER ID
   * =========================================================
   */

  const currentUserId = String(
    currentUser?.id || ""
  );

  /*
   * =========================================================
   * MY TASKS
   * =========================================================
   */

  const myTasks = Array.isArray(tasks)
    ? tasks.filter((task) => {
        const assigneeId = String(
          task?.assignee?.id ||
            task?.assigneeId ||
            ""
        );

        return (
          assigneeId &&
          assigneeId === currentUserId
        );
      })
    : [];

  /*
   * =========================================================
   * PROJECT LIST
   * =========================================================
   */

  const projectMap = new Map();

  myTasks.forEach((task) => {
    const project = task?.project;

    const projectId = String(
      project?.id ||
        task?.projectId ||
        ""
    );

    if (projectId && !projectMap.has(projectId)) {
      projectMap.set(projectId, {
        id: projectId,
        name:
          project?.name ||
          project?.code ||
          "Project",
      });
    }
  });

  const projects = Array.from(
    projectMap.values()
  ).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  /*
   * =========================================================
   * FILTER TASKS
   * =========================================================
   */

  const filteredTasks = myTasks.filter((task) => {
    const taskStatus = String(
      task?.status || ""
    ).toUpperCase();

    const taskPriority = String(
      task?.priority || ""
    ).toUpperCase();

    const taskProjectId = String(
      task?.project?.id ||
        task?.projectId ||
        ""
    );

    const search = searchTerm
      .trim()
      .toLowerCase();

    const matchesStatus =
      statusFilter === "ALL" ||
      taskStatus === statusFilter;

    const matchesPriority =
      priorityFilter === "ALL" ||
      taskPriority === priorityFilter;

    const matchesProject =
      projectFilter === "ALL" ||
      taskProjectId === projectFilter;

    const matchesSearch =
      !search ||
      String(task?.title || "")
        .toLowerCase()
        .includes(search) ||
      String(task?.description || "")
        .toLowerCase()
        .includes(search) ||
      String(task?.id || "")
        .toLowerCase()
        .includes(search);

    return (
      matchesStatus &&
      matchesPriority &&
      matchesProject &&
      matchesSearch
    );
  });

  /*
   * =========================================================
   * STATISTICS
   * =========================================================
   */

  const total = myTasks.length;

  const todo = myTasks.filter(
    (task) =>
      String(task?.status || "").toUpperCase() ===
      "TODO"
  ).length;

  const progress = myTasks.filter(
    (task) =>
      String(task?.status || "").toUpperCase() ===
      "IN_PROGRESS"
  ).length;

  const review = myTasks.filter(
    (task) =>
      String(task?.status || "").toUpperCase() ===
      "SUBMITTED"
  ).length;

  const completed = myTasks.filter(
    (task) =>
      String(task?.status || "").toUpperCase() ===
      "DONE"
  ).length;

  /*
   * =========================================================
   * CLEAR FILTERS
   * =========================================================
   */

  const clearFilters = () => {
    setStatusFilter("ALL");
    setPriorityFilter("ALL");
    setProjectFilter("ALL");
    setSearchTerm("");
  };

  const hasActiveFilters =
    statusFilter !== "ALL" ||
    priorityFilter !== "ALL" ||
    projectFilter !== "ALL" ||
    searchTerm.trim() !== "";

  /*
   * =========================================================
   * TASK ACTIONS
   * =========================================================
   */

  const handleStartTask = async (taskId) => {
    if (!currentUserId || !taskId) {
      return;
    }

    try {
      setActionLoading(`start-${taskId}`);

      const result = await startTask(
        taskId,
        currentUserId
      );

      if (!result?.success) {
        alert(
          result?.message ||
            "Unable to start the task."
        );
      }
    } catch (error) {
      console.error(
        "Start task error:",
        error
      );

      alert(
        "Unable to start the task."
      );
    } finally {
      setActionLoading("");
    }
  };

  const handleSubmitTask = async (taskId) => {
    if (!currentUserId || !taskId) {
      return;
    }

    try {
      setActionLoading(`submit-${taskId}`);

      const result = await submitTask(
        taskId,
        currentUserId
      );

      if (!result?.success) {
        alert(
          result?.message ||
            "Unable to submit the task for review."
        );
      }
    } catch (error) {
      console.error(
        "Submit task error:",
        error
      );

      alert(
        "Unable to submit the task for review."
      );
    } finally {
      setActionLoading("");
    }
  };

  /*
   * =========================================================
   * STATUS HELPERS
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

      case "SUBMITTED":
        return "Review";

      case "REJECTED":
        return "Rejected";

      case "DONE":
        return "Completed";

      default:
        return status || "Unknown";
    }
  };

  const getStatusClass = (status) => {
    switch (
      String(status || "").toUpperCase()
    ) {
      case "TODO":
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300";

      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";

      case "SUBMITTED":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400";

      case "REJECTED":
        return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";

      case "DONE":
        return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";

      default:
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  /*
   * =========================================================
   * PRIORITY
   * =========================================================
   */

  const getPriorityClass = (priority) => {
    switch (
      String(priority || "").toUpperCase()
    ) {
      case "HIGH":
        return "text-red-600 dark:text-red-400";

      case "MEDIUM":
        return "text-yellow-600 dark:text-yellow-400";

      case "LOW":
        return "text-green-600 dark:text-green-400";

      default:
        return "text-slate-500";
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
          HEADER
      ================================================= */}

      <div>
        <h1 className="text-2xl font-bold">
          My Tasks
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          View and track the tasks assigned to you.
        </p>
      </div>

      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">

        <StatCard
          icon={<Circle size={18} />}
          label="Total"
          value={total}
        />

        <StatCard
          icon={<Circle size={18} />}
          label="To Do"
          value={todo}
        />

        <StatCard
          icon={<Clock3 size={18} />}
          label="In Progress"
          value={progress}
        />

        <StatCard
          icon={<AlertCircle size={18} />}
          label="Review"
          value={review}
        />

        <StatCard
          icon={<CheckCircle2 size={18} />}
          label="Completed"
          value={completed}
        />

      </div>

      {/* =================================================
          FILTERS
      ================================================= */}

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">

        <div className="mb-4 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <Filter
              size={18}
              className="text-indigo-600 dark:text-indigo-400"
            />

            <h2 className="font-semibold">
              Filter Tasks
            </h2>

          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-400"
            >
              <X size={14} />
              Clear Filters
            </button>
          )}

        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          {/* SEARCH */}

          <div className="lg:col-span-1">

            <label className="mb-1.5 block text-xs font-medium text-slate-500">
              Search
            </label>

            <div className="relative">

              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                placeholder="Search tasks..."
                className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
              />

            </div>

          </div>

          {/* STATUS */}

          <div>

            <label className="mb-1.5 block text-xs font-medium text-slate-500">
              Status
            </label>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="ALL">
                All Statuses
              </option>

              <option value="TODO">
                To Do
              </option>

              <option value="IN_PROGRESS">
                In Progress
              </option>

              <option value="SUBMITTED">
                Review
              </option>

              <option value="REJECTED">
                Rejected
              </option>

              <option value="DONE">
                Completed
              </option>
            </select>

          </div>

          {/* PRIORITY */}

          <div>

            <label className="mb-1.5 block text-xs font-medium text-slate-500">
              Priority
            </label>

            <select
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value)
              }
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="ALL">
                All Priorities
              </option>

              <option value="HIGH">
                High
              </option>

              <option value="MEDIUM">
                Medium
              </option>

              <option value="LOW">
                Low
              </option>
            </select>

          </div>

          {/* PROJECT */}

          <div>

            <label className="mb-1.5 block text-xs font-medium text-slate-500">
              Project
            </label>

            <select
              value={projectFilter}
              onChange={(e) =>
                setProjectFilter(e.target.value)
              }
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="ALL">
                All Projects
              </option>

              {projects.map((project) => (
                <option
                  key={project.id}
                  value={project.id}
                >
                  {project.name}
                </option>
              ))}

            </select>

          </div>

        </div>

        {/* FILTER RESULT */}

        <div className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">

          Showing{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {filteredTasks.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {total}
          </span>{" "}
          assigned tasks

        </div>

      </div>

      {/* =================================================
          TASK LIST
      ================================================= */}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">

        <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">

          <h2 className="font-semibold">
            Assigned Tasks
          </h2>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Tasks assigned to your account.
          </p>

        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">

          {filteredTasks.length > 0 ? (

            filteredTasks.map((task) => {

              const taskStatus =
                String(
                  task?.status || ""
                ).toUpperCase();

              const isStarting =
                actionLoading ===
                `start-${task?.id}`;

              const isSubmitting =
                actionLoading ===
                `submit-${task?.id}`;

              const canStart =
                taskStatus === "TODO" ||
                taskStatus === "REJECTED";

              const canSubmit =
                taskStatus === "IN_PROGRESS";

              return (
                <div
                  key={task?.id}
                  className="p-5 transition hover:bg-slate-50 dark:hover:bg-slate-900"
                >

                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    {/* TASK INFO */}

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="font-medium">
                          {task?.title ||
                            "Untitled Task"}
                        </h3>

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                            task?.status
                          )}`}
                        >
                          {getStatusLabel(
                            task?.status
                          )}
                        </span>

                      </div>

                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        {task?.description ||
                          "No description available."}
                      </p>

                      {/* PROJECT */}

                      {task?.project && (
                        <p className="mt-3 text-xs text-slate-400">

                          Project:{" "}

                          <span className="font-medium text-slate-600 dark:text-slate-300">

                            {task.project.name ||
                              task.project.code ||
                              "Project"}

                          </span>

                        </p>
                      )}

                    </div>

                    {/* TASK DETAILS + ACTION */}

                    <div className="flex shrink-0 flex-wrap items-end gap-5">

                      {/* PRIORITY */}

                      <div>

                        <p className="text-[11px] uppercase tracking-wide text-slate-400">
                          Priority
                        </p>

                        <p
                          className={`mt-1 text-sm font-medium ${getPriorityClass(
                            task?.priority
                          )}`}
                        >
                          {task?.priority ||
                            "Normal"}
                        </p>

                      </div>

                      {/* DUE DATE */}

                      <div>

                        <p className="text-[11px] uppercase tracking-wide text-slate-400">
                          Due Date
                        </p>

                        <p className="mt-1 text-sm font-medium">
                          {task?.dueDate ||
                            "No date"}
                        </p>

                      </div>

                      {/* ACTION */}

                      {canStart && (
                        <button
                          type="button"
                          onClick={() =>
                            handleStartTask(
                              task?.id
                            )
                          }
                          disabled={
                            isStarting ||
                            !currentUserId
                          }
                          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Play size={14} />

                          {isStarting
                            ? "Starting..."
                            : "Start Task"}
                        </button>
                      )}

                      {canSubmit && (
                        <button
                          type="button"
                          onClick={() =>
                            handleSubmitTask(
                              task?.id
                            )
                          }
                          disabled={
                            isSubmitting ||
                            !currentUserId
                          }
                          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Send size={14} />

                          {isSubmitting
                            ? "Submitting..."
                            : "Submit for Review"}
                        </button>
                      )}

                      {taskStatus === "SUBMITTED" && (
                        <span className="inline-flex items-center gap-2 rounded-lg bg-yellow-50 px-4 py-2.5 text-xs font-medium text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400">
                          <Clock3 size={14} />
                          Awaiting Review
                        </span>
                      )}

                      {taskStatus === "DONE" && (
                        <span className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2.5 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                          <CheckCircle2 size={14} />
                          Completed
                        </span>
                      )}

                    </div>

                  </div>

                </div>
              );
            })

          ) : (

            <div className="p-10 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">

                <CheckCircle2 size={22} />

              </div>

              <h3 className="mt-4 font-medium">
                {hasActiveFilters
                  ? "No matching tasks"
                  : "No tasks assigned"}
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

                {hasActiveFilters
                  ? "Try changing your filters or search term."
                  : "You currently don't have any tasks assigned to you."}

              </p>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  Clear Filters
                </button>
              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

/*
 * =========================================================
 * STAT CARD
 * =========================================================
 */

function StatCard({
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

export default EmployeeTasks;
