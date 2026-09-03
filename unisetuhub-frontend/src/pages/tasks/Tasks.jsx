import {
  CheckCircle2,
  Circle,
  Clock3,
  Activity,
  Search,
  AlertCircle,
  X,
  Check,
  XCircle,
  MessageSquare,
} from "lucide-react";

import { useState } from "react";

import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";
import { useAuth } from "../../context/AuthContext";

function Tasks() {
  const {
    tasks = [],
    acceptTask,
    rejectTask,
  } = useTasks();

  const { projects = [] } = useProjects();

  const { currentUser } = useAuth();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  /*
   * =========================================================
   * REVIEW STATE
   * =========================================================
   */

  const [reviewTask, setReviewTask] = useState(null);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  /*
   * =========================================================
   * STATUS LABEL
   * =========================================================
   */

  const statusLabel = {
    TODO: "TO DO",
    IN_PROGRESS: "IN PROGRESS",
    SUBMITTED: "REVIEW",
    REJECTED: "REJECTED",
    DONE: "DONE",
  };

  /*
   * =========================================================
   * STATUS STYLE
   * =========================================================
   */

  const statusClass = (status) => {
    switch (
      String(status || "").toUpperCase()
    ) {
      case "DONE":
        return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";

      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";

      case "SUBMITTED":
        return "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400";

      case "REJECTED":
        return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";

      case "TODO":
      default:
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  /*
   * =========================================================
   * PRIORITY STYLE
   * =========================================================
   */

  const priorityClass = (priority) => {
    switch (
      String(priority || "").toUpperCase()
    ) {
      case "HIGH":
        return "text-red-600 dark:text-red-400";

      case "MEDIUM":
        return "text-orange-600 dark:text-orange-400";

      case "LOW":
        return "text-green-600 dark:text-green-400";

      default:
        return "text-slate-500 dark:text-slate-400";
    }
  };

  /*
   * =========================================================
   * USER NAME
   * =========================================================
   */

  const getUserName = (user) => {
    if (!user) {
      return "Unassigned";
    }

    if (user.name) {
      return user.name;
    }

    const fullName =
      `${user.firstName || ""} ${
        user.surname || ""
      }`.trim();

    return (
      fullName ||
      user.email ||
      "Unassigned"
    );
  };

  /*
   * =========================================================
   * ASSIGNEE INITIALS
   * =========================================================
   */

  const getInitials = (user) => {
    const name = getUserName(user);

    if (
      !name ||
      name === "Unassigned"
    ) {
      return "—";
    }

    const parts = name
      .split(" ")
      .filter(Boolean);

    if (parts.length === 1) {
      return parts[0]
        .substring(0, 2)
        .toUpperCase();
    }

    return (
      parts[0][0] +
      parts[parts.length - 1][0]
    ).toUpperCase();
  };

  /*
   * =========================================================
   * PROJECT NAME
   * =========================================================
   */

  const getProjectName = (task) => {
    if (task?.project?.name) {
      return task.project.name;
    }

    if (task?.project?.code) {
      return task.project.code;
    }

    const projectId =
      task?.project?.id ||
      task?.projectId ||
      "";

    const project = projects.find(
      (item) =>
        String(item.id) ===
          String(projectId) ||
        String(item.code) ===
          String(projectId)
    );

    return (
      project?.name ||
      project?.code ||
      projectId ||
      "Project"
    );
  };

  /*
   * =========================================================
   * PROJECT CODE
   * =========================================================
   */

  const getProjectCode = (task) => {
    return (
      task?.project?.code ||
      task?.project?.id ||
      task?.projectId ||
      "—"
    );
  };

  /*
   * =========================================================
   * ROLE BASED TASK ACCESS
   * =========================================================
   */

  const currentUserId = String(
    currentUser?.id || ""
  );

  const currentUserRole = String(
    currentUser?.role || ""
  ).toUpperCase();

  const currentCompanyId = String(
    currentUser?.company?.id ||
      currentUser?.companyId ||
      currentUser?.company?.companyId ||
      ""
  );

  /*
   * =========================================================
   * FIND PROJECT FOR TASK
   * =========================================================
   */

  const getTaskProject = (task) => {
    /*
     * Task already contains project details.
     * Try to match it with ProjectContext first.
     */

    const taskProjectId = String(
      task?.project?.id ||
        task?.project?.code ||
        task?.projectId ||
        ""
    );

    if (!taskProjectId) {
      return null;
    }

    const project = projects.find(
      (item) =>
        String(item?.id || "") ===
          taskProjectId ||
        String(item?.code || "") ===
          taskProjectId
    );

    return project || task?.project || null;
  };

  /*
   * =========================================================
   * PROJECT LEAD PROJECTS
   * =========================================================
   */

  const projectLeadProjectIds = new Set();

  if (currentUserRole === "PROJECT_LEAD") {
    projects.forEach((project) => {
      const projectLeaderId = String(
        project?.projectLeader?.id ||
          project?.projectLeaderId ||
          ""
      );

      if (
        projectLeaderId &&
        projectLeaderId === currentUserId
      ) {
        const projectId = String(
          project?.id ||
            project?.code ||
            ""
        );

        if (projectId) {
          projectLeadProjectIds.add(
            projectId
          );
        }
      }
    });
  }

  /*
   * =========================================================
   * TASK ACCESS CHECK
   * =========================================================
   */

  const taskIsVisibleToUser = (task) => {
    /*
     * WEBSITE ADMIN
     * Can see every task.
     */

    if (currentUserRole === "WEBSITE_ADMIN") {
      return true;
    }

    const taskProject =
      getTaskProject(task);

    /*
     * COMPANY HEAD
     * Can see all tasks belonging
     * to projects in their company.
     */

    if (currentUserRole === "COMPANY_HEAD") {
      const taskCompanyId = String(
        taskProject?.company?.id ||
          taskProject?.companyId ||
          taskProject?.company?.companyId ||
          ""
      );

      return (
        currentCompanyId !== "" &&
        taskCompanyId !== "" &&
        taskCompanyId === currentCompanyId
      );
    }

    /*
     * PROJECT LEAD
     * Can see only tasks belonging
     * to projects they lead.
     */

    if (currentUserRole === "PROJECT_LEAD") {
      const taskProjectId = String(
        taskProject?.id ||
          taskProject?.code ||
          task?.projectId ||
          ""
      );

      return projectLeadProjectIds.has(
        taskProjectId
      );
    }

    /*
     * EMPLOYEE
     * Can see only their assigned tasks.
     */

    if (currentUserRole === "EMPLOYEE") {
      const assigneeId = String(
        task?.assignee?.id ||
          task?.assigneeId ||
          ""
      );

      return (
        assigneeId !== "" &&
        assigneeId === currentUserId
      );
    }

    return false;
  };

  /*
   * =========================================================
   * FILTER TASKS
   * =========================================================
   */

  const scopedTasks = tasks.filter(
    taskIsVisibleToUser
  );

  const filteredTasks = scopedTasks.filter((task) => {
    const searchText = search
      .trim()
      .toLowerCase();

    const taskId = String(
      task?.id || ""
    ).toLowerCase();

    const title = String(
      task?.title || ""
    ).toLowerCase();

    const description = String(
      task?.description || ""
    ).toLowerCase();

    const assigneeName = getUserName(
      task?.assignee
    ).toLowerCase();

    const assigneeEmail = String(
      task?.assignee?.email || ""
    ).toLowerCase();

    const projectName =
      getProjectName(task).toLowerCase();

    const projectCode =
      getProjectCode(task).toLowerCase();

    const matchesSearch =
      !searchText ||
      taskId.includes(searchText) ||
      title.includes(searchText) ||
      description.includes(searchText) ||
      assigneeName.includes(searchText) ||
      assigneeEmail.includes(searchText) ||
      projectName.includes(searchText) ||
      projectCode.includes(searchText);

    const taskStatus = String(
      task?.status || ""
    ).toUpperCase();

    const taskPriority = String(
      task?.priority || ""
    ).toUpperCase();

    const matchesStatus =
      statusFilter === "all" ||
      taskStatus === statusFilter;

    const matchesPriority =
      priorityFilter === "all" ||
      taskPriority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  /*
   * =========================================================
   * OPEN REVIEW
   * =========================================================
   */

  const openReview = (task) => {
    setReviewTask(task);
    setReviewComment(
      task?.reviewComment || ""
    );
  };

  /*
   * =========================================================
   * CLOSE REVIEW
   * =========================================================
   */

  const closeReview = () => {
    if (reviewLoading) {
      return;
    }

    setReviewTask(null);
    setReviewComment("");
  };

  /*
   * =========================================================
   * APPROVE TASK
   * =========================================================
   */

  const handleApproveTask = async () => {
    if (
      !reviewTask?.id ||
      !currentUser?.id
    ) {
      return;
    }

    try {
      setReviewLoading(true);

      const result = await acceptTask(
        reviewTask.id,
        currentUser.id,
        reviewComment.trim()
      );

      if (!result?.success) {
        alert(
          result?.message ||
            "Unable to approve the task."
        );

        return;
      }

      alert(
        "Task approved and completed."
      );

      closeReview();
    } catch (error) {
      console.error(
        "Approve task error:",
        error
      );

      alert(
        "Unable to approve the task."
      );
    } finally {
      setReviewLoading(false);
    }
  };

  /*
   * =========================================================
   * REJECT TASK
   * =========================================================
   */

  const handleRejectTask = async () => {
    if (
      !reviewTask?.id ||
      !currentUser?.id
    ) {
      return;
    }

    if (!reviewComment.trim()) {
      alert(
        "Please write a review comment before rejecting the task."
      );

      return;
    }

    try {
      setReviewLoading(true);

      const result = await rejectTask(
        reviewTask.id,
        currentUser.id,
        reviewComment.trim()
      );

      if (!result?.success) {
        alert(
          result?.message ||
            "Unable to reject the task."
        );

        return;
      }

      alert(
        "Task rejected and sent back to the employee."
      );

      closeReview();
    } catch (error) {
      console.error(
        "Reject task error:",
        error
      );

      alert(
        "Unable to reject the task."
      );
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div>

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            <Activity size={20} />
          </div>

          <div>

            <h1 className="text-2xl font-bold">
              Tasks
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Track and manage tasks across your projects.
            </p>

          </div>

        </div>

      </div>

      {/* =================================================
          FILTERS
      ================================================= */}

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">

        <div className="flex flex-col gap-3 lg:flex-row">

          {/* SEARCH */}

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search by task ID, title, project or assignee..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
            />

          </div>

          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <option value="all">
              All Status
            </option>

            <option value="TODO">
              TO DO
            </option>

            <option value="IN_PROGRESS">
              IN PROGRESS
            </option>

            <option value="SUBMITTED">
              REVIEW
            </option>

            <option value="REJECTED">
              REJECTED
            </option>

            <option value="DONE">
              DONE
            </option>
          </select>

          {/* PRIORITY */}

          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value)
            }
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <option value="all">
              All Priority
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

      </div>

      {/* =================================================
          TASK TABLE
      ================================================= */}

      {filteredTasks.length > 0 ? (

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">

          <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">

            <h2 className="font-semibold">
              All Tasks
            </h2>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Showing {filteredTasks.length} of{" "}
              {scopedTasks.length} tasks
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1100px]">

              <thead>

                <tr className="border-b border-slate-200 text-left dark:border-slate-800">

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Task
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Project
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Status
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Priority
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Assignee
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Due Date
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredTasks.map((task) => {

                  const taskStatus = String(
                    task?.status || ""
                  ).toUpperCase();

                  const taskAssignee =
                    task?.assignee;

                  return (
                    <tr
                      key={task?.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                    >

                      {/* TASK */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          {taskStatus === "DONE" ? (

                            <CheckCircle2
                              size={18}
                              className="text-green-500"
                            />

                          ) : taskStatus ===
                            "IN_PROGRESS" ? (

                            <Clock3
                              size={18}
                              className="text-blue-500"
                            />

                          ) : taskStatus ===
                            "SUBMITTED" ? (

                            <AlertCircle
                              size={18}
                              className="text-orange-500"
                            />

                          ) : taskStatus ===
                            "REJECTED" ? (

                            <AlertCircle
                              size={18}
                              className="text-red-500"
                            />

                          ) : (

                            <Circle
                              size={18}
                              className="text-slate-400"
                            />

                          )}

                          <div>

                            <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                              {task?.id}
                            </p>

                            <p className="mt-1 text-sm font-medium">
                              {task?.title ||
                                "Untitled Task"}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* PROJECT */}

                      <td className="px-5 py-4">

                        <div>

                          <p className="text-sm font-medium">
                            {getProjectName(task)}
                          </p>

                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {getProjectCode(task)}
                          </p>

                        </div>

                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4">

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(
                            task?.status
                          )}`}
                        >
                          {statusLabel[
                            taskStatus
                          ] ||
                            task?.status ||
                            "UNKNOWN"}
                        </span>

                      </td>

                      {/* PRIORITY */}

                      <td className="px-5 py-4">

                        <span
                          className={`text-sm font-medium ${priorityClass(
                            task?.priority
                          )}`}
                        >
                          {task?.priority ||
                            "Normal"}
                        </span>

                      </td>

                      {/* ASSIGNEE */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2">

                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                            {getInitials(
                              taskAssignee
                            )}
                          </div>

                          <div className="min-w-0">

                            <p className="truncate text-sm font-medium">
                              {getUserName(
                                taskAssignee
                              )}
                            </p>

                            {taskAssignee?.email && (
                              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                                {taskAssignee.email}
                              </p>
                            )}

                          </div>

                        </div>

                      </td>

                      {/* DUE DATE */}

                      <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">

                        {task?.dueDate ||
                          "No due date"}

                      </td>

                      {/* ACTION */}

                      <td className="px-5 py-4">

                        {taskStatus ===
                        "SUBMITTED" ? (

                          <button
                            type="button"
                            onClick={() =>
                              openReview(task)
                            }
                            className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-orange-600"
                          >
                            <MessageSquare
                              size={14}
                            />

                            Review
                          </button>

                        ) : taskStatus ===
                          "DONE" ? (

                          <span className="text-xs font-medium text-green-600 dark:text-green-400">
                            Completed
                          </span>

                        ) : taskStatus ===
                          "REJECTED" ? (

                          <span className="text-xs font-medium text-red-600 dark:text-red-400">
                            Returned to employee
                          </span>

                        ) : (

                          <span className="text-xs text-slate-400">
                            —
                          </span>

                        )}

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        </div>

      ) : (

        /* =================================================
            EMPTY STATE
        ================================================= */

        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-950">

          <h2 className="text-lg font-semibold">
            No tasks found
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {scopedTasks.length === 0
              ? "Tasks created inside your projects will appear here."
              : "Try changing your search or filters."}
          </p>

        </div>

      )}

      {/* =================================================
          REVIEW MODAL
      ================================================= */}

      {reviewTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                  <MessageSquare size={20} />
                </div>

                <div>

                  <h2 className="font-semibold">
                    Review Task
                  </h2>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {reviewTask.id} ·{" "}
                    {reviewTask.title}
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={closeReview}
                disabled={reviewLoading}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <X size={18} />
              </button>

            </div>

            {/* BODY */}

            <div className="space-y-5 p-6">

              {/* TASK DETAILS */}

              <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Employee
                </p>

                <p className="mt-1 text-sm font-medium">
                  {getUserName(
                    reviewTask.assignee
                  )}
                </p>

                {reviewTask.assignee?.email && (
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {reviewTask.assignee.email}
                  </p>
                )}

              </div>

              {/* COMMENT */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Review Comment
                </label>

                <textarea
                  value={reviewComment}
                  onChange={(e) =>
                    setReviewComment(
                      e.target.value
                    )
                  }
                  rows={5}
                  placeholder="Write your feedback about the completed work..."
                  disabled={reviewLoading}
                  className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:placeholder:text-slate-600"
                />

                <p className="mt-1.5 text-xs text-slate-400">
                  A comment is required when rejecting a task.
                </p>

              </div>

            </div>

            {/* FOOTER */}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end dark:border-slate-800">

              <button
                type="button"
                onClick={handleRejectTask}
                disabled={
                  reviewLoading ||
                  !reviewComment.trim()
                }
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <XCircle size={16} />

                {reviewLoading
                  ? "Processing..."
                  : "Reject Task"}
              </button>

              <button
                type="button"
                onClick={handleApproveTask}
                disabled={reviewLoading}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Check size={16} />

                {reviewLoading
                  ? "Processing..."
                  : "Approve & Complete"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Tasks;