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
import { useProjects } from "../../context/ProjectContext";
import { useAuth } from "../../context/AuthContext";

function ProjectDetails() {
  const { projectId } = useParams();

  const { tasks = [] } = useTasks();
  const { projects = [] } = useProjects();

  const { users = [], currentUser, hasProjectAccess } =
    useAuth();

  /*
   * =========================================================
   * NORMALIZE PROJECT ID
   * =========================================================
   */

  const normalizedProjectId =
    String(projectId || "").toUpperCase();

  /*
   * =========================================================
   * FIND CURRENT PROJECT
   * =========================================================
   *
   * Supports:
   *
   * /projects/WEB
   * /projects/CRM
   *
   * and also:
   *
   * /projects/{uuid}
   *
   */

  const project = projects.find((item) => {
    const id = String(item?.id || "").toUpperCase();

    const code = String(item?.code || "").toUpperCase();

    return (
      id === normalizedProjectId ||
      code === normalizedProjectId
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
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          <FolderKanban size={22} />
        </div>

        <h1 className="mt-4 text-xl font-semibold">
          Project Not Found
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          The project "{projectId}" does not exist.
        </p>

        <Link
          to="/projects"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>
      </div>
    );
  }

  /*
   * =========================================================
   * PROJECT IDENTIFIERS
   * =========================================================
   */

  const projectCode = String(
    project?.code || project?.id || ""
  ).toUpperCase();

  const projectDatabaseId = String(
    project?.id || ""
  ).toUpperCase();

  /*
   * =========================================================
   * PROJECT COMPANY
   * =========================================================
   */

  const projectCompanyId = String(
    project?.company?.id ||
      project?.companyId ||
      ""
  );

  /*
   * =========================================================
   * PROJECT ACCESS
   * =========================================================
   *
   * Check both project ID and project code.
   *
   */

  const hasAccess =
    hasProjectAccess(
      projectDatabaseId || projectCode,
      projectCompanyId || null
    ) ||
    hasProjectAccess(
      projectCode,
      projectCompanyId || null
    );

  /*
   * =========================================================
   * ACCESS DENIED
   * =========================================================
   */

  if (!hasAccess) {
    return (
      <div className="rounded-xl border border-red-200 bg-white p-10 text-center dark:border-red-900/50 dark:bg-slate-950">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
          <Users size={22} />
        </div>

        <h1 className="mt-4 text-xl font-semibold">
          Access Denied
        </h1>

        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
          You do not have permission to access this
          project.
        </p>

        <Link
          to="/projects"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>
      </div>
    );
  }

  /*
   * =========================================================
   * PROJECT TASKS
   * =========================================================
   *
   * Tasks can reference the project by:
   *
   * task.projectId === project.id
   *
   * OR
   *
   * task.projectId === project.code
   *
   */

  const projectTasks = tasks.filter((task) => {
    const taskProjectId = String(
      task?.projectId || ""
    ).toUpperCase();

    return (
      taskProjectId === projectDatabaseId ||
      taskProjectId === projectCode
    );
  });

  /*
   * =========================================================
   * TASK STATISTICS
   * =========================================================
   */

  const totalTasks = projectTasks.length;

  const todoTasks = projectTasks.filter(
    (task) =>
      String(task?.status || "").toLowerCase() ===
      "todo"
  ).length;

  const progressTasks = projectTasks.filter(
    (task) =>
      String(task?.status || "").toLowerCase() ===
      "progress"
  ).length;

  const reviewTasks = projectTasks.filter(
    (task) =>
      String(task?.status || "").toLowerCase() ===
      "review"
  ).length;

  const completedTasks = projectTasks.filter(
    (task) =>
      String(task?.status || "").toLowerCase() ===
      "done"
  ).length;

  /*
   * =========================================================
   * PROJECT PROGRESS
   * =========================================================
   */

  const progress =
    totalTasks > 0
      ? Math.round(
          (completedTasks / totalTasks) * 100
        )
      : 0;

  /*
   * =========================================================
   * PROJECT STATUS
   * =========================================================
   */

  const projectStatus =
    project?.status?.toString().toLowerCase() ||
    (totalTasks > 0 &&
    completedTasks === totalTasks
      ? "completed"
      : "active");

  /*
   * =========================================================
   * PROJECT LEADER
   * =========================================================
   */

  const projectLeaderId = String(
    project?.projectLeader?.id ||
      project?.projectLeaderId ||
      ""
  );

  const projectLeader =
    project?.projectLeader ||
    users.find(
      (user) =>
        String(user?.id || "") ===
        projectLeaderId
    );

  /*
   * =========================================================
   * PROJECT MEMBERS
   * =========================================================
   *
   * First use project.members.
   *
   * Then include project leader.
   *
   * Then include task assignees as fallback/additional
   * members.
   *
   */

  const projectMembersFromProject = Array.isArray(
    project?.members
  )
    ? project.members
    : [];

  const memberIds = [];

  /*
   * Add members from project.members
   */

  projectMembersFromProject.forEach((member) => {
    if (member?.id) {
      memberIds.push(String(member.id));
    }
  });

  /*
   * Add project leader
   */

  if (projectLeaderId) {
    memberIds.push(projectLeaderId);
  }

  /*
   * Add task assignees
   */

  projectTasks.forEach((task) => {
    if (task?.assigneeId) {
      memberIds.push(String(task.assigneeId));
    }
  });

  /*
   * Remove duplicate IDs
   */

  const uniqueMemberIds = [
    ...new Set(memberIds),
  ];

  /*
   * Convert IDs to user objects
   */

  const members = uniqueMemberIds
    .map((memberId) => {
      /*
       * First check project.members
       */

      const projectMember =
        projectMembersFromProject.find(
          (member) =>
            String(member?.id || "") ===
            memberId
        );

      if (projectMember) {
        return projectMember;
      }

      /*
       * Otherwise check users
       */

      return users.find(
        (user) =>
          String(user?.id || "") ===
          memberId
      );
    })
    .filter(Boolean);

  /*
   * =========================================================
   * ROLE LABELS
   * =========================================================
   */

  const roleLabel = {
    WEBSITE_ADMIN: "Website Admin",
    COMPANY_HEAD: "Company Head",
    PROJECT_LEAD: "Project Lead",
    EMPLOYEE: "Employee",
  };

  /*
   * =========================================================
   * RECENT TASKS
   * =========================================================
   */

  const recentTasks = [...projectTasks]
    .reverse()
    .slice(0, 5);

  /*
   * =========================================================
   * LEADER NAME
   * =========================================================
   */

  const leaderName = projectLeader
    ? getUserName(projectLeader)
    : "Not assigned";

  /*
   * =========================================================
   * PROJECT STATUS LABEL
   * =========================================================
   */

  const statusLabel =
    projectStatus === "completed"
      ? "Completed"
      : projectStatus === "active"
      ? "Active"
      : capitalize(projectStatus);

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
            {/* Project Code */}

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-sm font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              {projectCode || "PRJ"}
            </div>

            {/* Project Information */}

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold">
                  {project?.name ||
                    "Unnamed Project"}
                </h1>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    projectStatus ===
                    "completed"
                      ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                  }`}
                >
                  {statusLabel}
                </span>
              </div>

              <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                {project?.description ||
                  "No project description available."}
              </p>

              {/* Project Type */}

              {project?.type && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <FolderKanban size={13} />

                  {project.type}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <div className="mb-6 overflow-x-auto border-b border-slate-200 dark:border-slate-800">
        <div className="flex min-w-max gap-6">
          {/* Overview */}

          <Link
            to={`/projects/${projectCode}`}
            className="border-b-2 border-indigo-600 px-1 pb-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400"
          >
            Overview
          </Link>

          {/* Board */}

          <Link
            to={`/projects/${projectCode}/board`}
            className="px-1 pb-3 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            Board
          </Link>

          {/* Backlog */}

          <Link
            to={`/projects/${projectCode}/backlog`}
            className="px-1 pb-3 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            Backlog
          </Link>

          {/* Tasks */}

          <Link
            to={`/projects/${projectCode}/tasks`}
            className="px-1 pb-3 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            Tasks
          </Link>

          {/* Members */}

          <Link
            to={`/projects/${projectCode}/members`}
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
                {members.length}
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
          TASK BREAKDOWN
      ===================================================== */}

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <MiniStat
          label="To Do"
          value={todoTasks}
        />

        <MiniStat
          label="In Progress"
          value={progressTasks}
        />

        <MiniStat
          label="Review"
          value={reviewTasks}
        />

        <MiniStat
          label="Completed"
          value={completedTasks}
        />
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
                Overall completion of project
                tasks.
              </p>
            </div>

            <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
              {progress}%
            </span>
          </div>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="mt-3 flex justify-between text-xs text-slate-400">
            <span>
              {completedTasks} completed
            </span>

            <span>
              {totalTasks - completedTasks}{" "}
              remaining
            </span>
          </div>
        </div>

        {/* Quick Actions */}

        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-semibold">
            Quick Actions
          </h2>

          <div className="mt-4 space-y-2">
            {/* Board */}

            <Link
              to={`/projects/${projectCode}/board`}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <FolderKanban
                size={18}
                className="text-indigo-500"
              />

              Open Board
            </Link>

            {/* Tasks */}

            <Link
              to={`/projects/${projectCode}/tasks`}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <ListTodo
                size={18}
                className="text-indigo-500"
              />

              View Tasks
            </Link>

            {/* Members */}

            <Link
              to={`/projects/${projectCode}/members`}
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
          PROJECT INFORMATION
      ===================================================== */}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Project Leader */}

        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <Users
              size={18}
              className="text-indigo-500"
            />

            <h2 className="font-semibold">
              Project Leader
            </h2>
          </div>

          {projectLeader ? (
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                {getInitials(
                  leaderName
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {leaderName}
                </p>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {roleLabel[
                    projectLeader.role
                  ] ||
                    projectLeader.role ||
                    "Project Lead"}
                </p>
              </div>
            </div>
          ) : (
            <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
              No project leader assigned.
            </p>
          )}
        </div>

        {/* Current User */}

        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <Users
              size={18}
              className="text-indigo-500"
            />

            <h2 className="font-semibold">
              Your Access
            </h2>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium">
              {getUserName(
                currentUser
              ) || "Current User"}
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {roleLabel[
                currentUser?.role
              ] ||
                currentUser?.role ||
                "User"}
            </p>

            <span className="mt-3 inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
              Project Access Granted
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          TEAM MEMBERS
      ===================================================== */}

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users
              size={19}
              className="text-indigo-600 dark:text-indigo-400"
            />

            <h2 className="font-semibold">
              Team Members
            </h2>
          </div>

          <span className="text-xs text-slate-400">
            {members.length} member
            {members.length !== 1
              ? "s"
              : ""}
          </span>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.length > 0 ? (
            members.map((member) => {
              const memberName =
                getUserName(member);

              const isLeader =
                String(member?.id || "") ===
                projectLeaderId;

              return (
                <div
                  key={
                    member?.id ||
                    member?.email
                  }
                  className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 dark:border-slate-800"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    {getInitials(
                      memberName
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium">
                        {memberName ||
                          "User"}
                      </p>

                      {isLeader && (
                        <span className="shrink-0 rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                          Leader
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {roleLabel[
                        member?.role
                      ] ||
                        member?.role ||
                        "Member"}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No members assigned to this
              project yet.
            </p>
          )}
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
          {recentTasks.length > 0 ? (
            recentTasks.map((task) => {
              const status =
                String(
                  task?.status || ""
                ).toLowerCase();

              return (
                <div
                  key={task?.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        status === "done"
                          ? "bg-green-500"
                          : status ===
                            "progress"
                          ? "bg-blue-500"
                          : status ===
                            "review"
                          ? "bg-orange-500"
                          : "bg-slate-400"
                      }`}
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm">
                        <span className="font-medium">
                          {task?.id}
                        </span>

                        {" - "}

                        {task?.title ||
                          "Untitled Task"}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {formatStatus(
                          status
                        )}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 text-xs font-medium text-slate-400">
                    {getAssigneeName(
                      task,
                      users
                    )}
                  </span>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No tasks have been created
              for this project yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/*
 * =========================================================
 * MINI STAT
 * =========================================================
 */

function MiniStat({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold">
        {value}
      </p>
    </div>
  );
}

/*
 * =========================================================
 * GET USER NAME
 * =========================================================
 */

function getUserName(user) {
  if (!user) {
    return "";
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
    ""
  );
}

/*
 * =========================================================
 * GET INITIALS
 * =========================================================
 */

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/*
 * =========================================================
 * GET TASK ASSIGNEE NAME
 * =========================================================
 */

function getAssigneeName(task, users) {
  if (task?.assignee) {
    if (
      typeof task.assignee ===
      "string"
    ) {
      return task.assignee;
    }

    return getUserName(
      task.assignee
    );
  }

  if (task?.assigneeId) {
    const user = users.find(
      (item) =>
        String(item?.id || "") ===
        String(task.assigneeId)
    );

    if (user) {
      return getUserName(user);
    }
  }

  return "Unassigned";
}

/*
 * =========================================================
 * FORMAT STATUS
 * =========================================================
 */

function formatStatus(status) {
  const labels = {
    todo: "To Do",
    progress: "In Progress",
    review: "Review",
    done: "Completed",
  };

  return (
    labels[status] ||
    capitalize(status) ||
    "Unknown"
  );
}

/*
 * =========================================================
 * CAPITALIZE
 * =========================================================
 */

function capitalize(value = "") {
  if (!value) {
    return "";
  }

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
}

export default ProjectDetails;