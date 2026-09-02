import {
  Activity,
  CheckCircle2,
  Circle,
  Clock3,
  User,
  Users,
} from "lucide-react";

import { useParams } from "react-router-dom";

import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";
import { useAuth } from "../../context/AuthContext";

function ProjectOverview() {
  const { projectId } = useParams();

  const { tasks = [] } = useTasks();
  const { projects = [] } = useProjects();

  const {
    users = [],
    currentUser,
    hasProjectAccess,
  } = useAuth();

  /*
   * =========================================================
   * NORMALIZED PROJECT ID
   * =========================================================
   */

  const currentProjectId = String(
    projectId || ""
  ).toUpperCase();

  /*
   * =========================================================
   * FIND CURRENT PROJECT
   * =========================================================
   *
   * Projects.jsx uses project.code as the
   * project identifier in several places.
   *
   * We support both:
   *
   * project.code
   * project.id
   *
   */

  const project = projects.find((item) => {
    const itemCode = String(
      item?.code || ""
    ).toUpperCase();

    const itemId = String(
      item?.id || ""
    ).toUpperCase();

    return (
      itemCode === currentProjectId ||
      itemId === currentProjectId
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
          <Circle size={22} />
        </div>

        <h1 className="mt-4 text-xl font-semibold">
          Project Not Found
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          The project "{projectId}" does not exist.
        </p>
      </div>
    );
  }

  /*
   * =========================================================
   * PROJECT IDENTIFIERS
   * =========================================================
   */

  const normalizedProjectId = String(
    project.id || ""
  ).toUpperCase();

  const normalizedProjectCode = String(
    project.code || ""
  ).toUpperCase();

  /*
   * =========================================================
   * PROJECT COMPANY ID
   * =========================================================
   */

  const projectCompanyId =
    project?.company?.id ||
    project?.companyId ||
    null;

  /*
   * =========================================================
   * PROJECT ACCESS
   * =========================================================
   *
   * IMPORTANT:
   *
   * We pass the actual project ID and company ID
   * to AuthContext.
   *
   */

  const hasAccess = hasProjectAccess(
    normalizedProjectCode ||
    normalizedProjectId,
    projectCompanyId
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
          <User size={22} />
        </div>

        <h1 className="mt-4 text-xl font-semibold">
          Access Denied
        </h1>

        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
          You do not have permission to access this project.
        </p>
      </div>
    );
  }

  /*
 * =========================================================
 * PROJECT TASKS
 * =========================================================
 *
 * Backend can return project in either form:
 *
 * task.project.id
 * task.project.code
 *
 * OR:
 *
 * task.projectId
 *
 * We support all of them.
 */

  const projectTasks = Array.isArray(tasks)
    ? tasks.filter((task) => {

      const taskProjectId = String(
        task?.project?.id ||
        task?.projectId ||
        ""
      )
        .trim()
        .toUpperCase();

      const taskProjectCode = String(
        task?.project?.code ||
        ""
      )
        .trim()
        .toUpperCase();

      return (
        taskProjectId ===
        normalizedProjectId ||
        taskProjectId ===
        normalizedProjectCode ||
        taskProjectCode ===
        normalizedProjectId ||
        taskProjectCode ===
        normalizedProjectCode
      );
    })
    : [];

  /*
   * =========================================================
   * TASK STATISTICS
   * =========================================================
   */

  const stats = {
    total: projectTasks.length,

    todo: projectTasks.filter(
      (task) =>
        String(
          task?.status || ""
        ).toLowerCase() === "todo"
    ).length,

    progress: projectTasks.filter(
      (task) =>
        String(
          task?.status || ""
        ).toLowerCase() ===
        "progress"
    ).length,

    review: projectTasks.filter(
      (task) =>
        String(
          task?.status || ""
        ).toLowerCase() === "review"
    ).length,

    done: projectTasks.filter(
      (task) =>
        String(
          task?.status || ""
        ).toLowerCase() === "done"
    ).length,
  };

  /*
   * =========================================================
   * COMPLETION PERCENTAGE
   * =========================================================
   */

  const progress =
    stats.total > 0
      ? Math.round(
        (stats.done / stats.total) *
        100
      )
      : 0;

  /*
  * =========================================================
  * PROJECT MEMBERS
  * =========================================================
  *
  * Primary source:
  *
  * project.members
  *
  * We also add the project leader if the
  * backend members array doesn't contain them.
  *
  */

  const projectMembers = Array.isArray(
    project?.members
  )
    ? project.members
    : [];

  /*
   * =========================================================
   * PROJECT LEADER
   * =========================================================
   */

  const projectLeader =
    project?.projectLeader ||
    null;

  /*
   * =========================================================
   * LEADER FALLBACK
   * =========================================================
   */

  let resolvedProjectLeader =
    projectLeader;

  if (
    !resolvedProjectLeader?.id
  ) {
    const leaderId =
      project?.projectLeaderId;

    if (leaderId) {
      resolvedProjectLeader =
        users.find(
          (user) =>
            String(user?.id) ===
            String(leaderId)
        ) || null;
    }
  }

  /*
   * =========================================================
   * MERGE MEMBERS + LEADER
   * =========================================================
   */

  const memberMap = new Map();

  projectMembers.forEach((member) => {
    if (member?.id) {
      memberMap.set(
        String(member.id),
        member
      );
    }
  });

  if (resolvedProjectLeader?.id) {
    memberMap.set(
      String(resolvedProjectLeader.id),
      resolvedProjectLeader
    );
  }

  /*
   * =========================================================
   * FALLBACK USER LOOKUP
   * =========================================================
   *
   * If project.members contains only IDs,
   * find the full user from AuthContext users.
   *
   */

  const members = Array.from(
    memberMap.values()
  )
    .map((member) => {
      const memberId = String(
        member?.id || ""
      );

      if (
        member?.firstName ||
        member?.surname ||
        member?.name ||
        member?.email
      ) {
        return member;
      }

      return (
        users.find(
          (user) =>
            String(user?.id) ===
            memberId
        ) || member
      );
    })
    .filter(Boolean)
    .sort((a, b) => {
      /*
       * =====================================================
       * LEADER FIRST
       * =====================================================
       */

      const leaderId = String(
        resolvedProjectLeader?.id || ""
      );

      const aId = String(
        a?.id || ""
      );

      const bId = String(
        b?.id || ""
      );

      if (
        aId === leaderId &&
        bId !== leaderId
      ) {
        return -1;
      }

      if (
        bId === leaderId &&
        aId !== leaderId
      ) {
        return 1;
      }

      /*
       * =====================================================
       * REST OF MEMBERS A-Z
       * =====================================================
       */

      const nameA =
        getUserName(a)
          .trim()
          .toLowerCase();

      const nameB =
        getUserName(b)
          .trim()
          .toLowerCase();

      return nameA.localeCompare(nameB);
    });

  /*
   * =========================================================
   * RECENT ACTIVITY
   * =========================================================
   *
   * Currently based on project tasks.
   *
   * Later this can be replaced by a real
   * ActivityContext / backend activity table.
   *
   */

  const recentTasks = [
    ...projectTasks,
  ]
    .reverse()
    .slice(0, 5);

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
   * PROJECT LEADER NAME
   * =========================================================
   */

  const leaderName =
    getUserName(
      resolvedProjectLeader
    ) || "Not assigned";

  /*
   * =========================================================
   * CURRENT USER NAME
   * =========================================================
   */

  const currentUserName =
    getUserName(currentUser) ||
    "Current User";

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="space-y-6">

      {/* =================================================
          PROJECT HEADER
      ================================================= */}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">

                {project?.code || "PRJ"}

              </div>

              <div>

                <h1 className="text-xl font-bold">

                  {project?.name ||
                    "Unnamed Project"}

                </h1>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">

                  {project?.code ||
                    "Project"}

                </p>

              </div>

            </div>

            <p className="mt-4 max-w-2xl text-sm text-slate-500 dark:text-slate-400">

              {project?.description ||
                "No description available."}

            </p>

          </div>

          <span className="inline-flex w-fit rounded-full bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">

            Active

          </span>

        </div>

      </div>

      {/* =================================================
          PROJECT PROGRESS
      ================================================= */}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-base font-semibold">
              Project Progress
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

              {stats.done} of{" "}
              {stats.total} tasks completed

            </p>

          </div>

          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">

            {progress}%

          </span>

        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">

          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* =================================================
          TASK STATISTICS
      ================================================= */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">

        <StatCard
          icon={<Circle size={18} />}
          label="Total Tasks"
          value={stats.total}
        />

        <StatCard
          icon={<Circle size={18} />}
          label="To Do"
          value={stats.todo}
        />

        <StatCard
          icon={<Clock3 size={18} />}
          label="In Progress"
          value={stats.progress}
        />

        <StatCard
          icon={<Activity size={18} />}
          label="Review"
          value={stats.review}
        />

        <StatCard
          icon={<CheckCircle2 size={18} />}
          label="Completed"
          value={stats.done}
        />

      </div>

      {/* =================================================
          PROJECT INFORMATION
      ================================================= */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* =================================================
            PROJECT LEADER
        ================================================= */}

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">

          <div className="flex items-center gap-2">

            <User
              size={19}
              className="text-indigo-600 dark:text-indigo-400"
            />

            <h2 className="font-semibold">
              Project Leader
            </h2>

          </div>

          {resolvedProjectLeader ? (

            <div className="mt-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">

                {getInitials(
                  leaderName
                )}

              </div>

              <div>

                <p className="text-sm font-medium">

                  {leaderName}

                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400">

                  {roleLabel[
                    resolvedProjectLeader
                      ?.role
                  ] ||
                    resolvedProjectLeader?.role ||
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

        {/* =================================================
            CURRENT USER
        ================================================= */}

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">

          <div className="flex items-center gap-2">

            <User
              size={19}
              className="text-indigo-600 dark:text-indigo-400"
            />

            <h2 className="font-semibold">
              Your Access
            </h2>

          </div>

          <div className="mt-5">

            <p className="text-sm font-medium">

              {currentUserName}

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

      {/* =================================================
          MEMBERS + ACTIVITY
      ================================================= */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* =================================================
            TEAM MEMBERS
        ================================================= */}

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">

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

          <div className="mt-5 space-y-4">

            {members.length > 0 ? (

              members.map(
                (member) => {

                  const memberName =
                    getUserName(
                      member
                    ) || "User";

                  const memberId =
                    String(
                      member?.id || ""
                    );

                  const leaderId =
                    String(
                      resolvedProjectLeader?.id ||
                      ""
                    );

                  return (
                    <div
                      key={
                        member?.id ||
                        member?.email ||
                        memberName
                      }
                      className="flex items-center gap-3"
                    >

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">

                        {getInitials(
                          memberName
                        )}

                      </div>

                      <div className="min-w-0">

                        <div className="flex items-center gap-2">

                          <p className="truncate text-sm font-medium">

                            {memberName}

                          </p>

                          {memberId ===
                            leaderId && (

                              <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">

                                Leader

                              </span>

                            )}

                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400">

                          {roleLabel[
                            member?.role
                          ] ||
                            member?.role ||
                            "Employee"}

                        </p>

                      </div>

                    </div>
                  );
                }
              )

            ) : (

              <p className="text-sm text-slate-500 dark:text-slate-400">

                No members assigned yet.

              </p>

            )}

          </div>

        </div>

        {/* =================================================
            RECENT ACTIVITY
        ================================================= */}

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">

          <div className="flex items-center gap-2">

            <Activity
              size={19}
              className="text-indigo-600 dark:text-indigo-400"
            />

            <h2 className="font-semibold">
              Recent Activity
            </h2>

          </div>

          <div className="mt-5 space-y-5">

            {recentTasks.length > 0 ? (

              recentTasks.map(
                (task) => (

                  <div
                    key={
                      task?.id ||
                      `${task?.projectId}-${task?.title}`
                    }
                    className="flex gap-3"
                  >

                    <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />

                    <div className="min-w-0">

                      <p className="text-sm">

                        <span className="font-medium">

                          {task?.id ||
                            "Task"}

                        </span>

                        {" — "}

                        {task?.title ||
                          "Untitled Task"}

                      </p>

                      <p className="mt-1 text-xs capitalize text-slate-500 dark:text-slate-400">

                        Status:{" "}

                        {formatStatus(
                          task?.status
                        )}

                      </p>

                    </div>

                  </div>

                )
              )

            ) : (

              <p className="text-sm text-slate-500 dark:text-slate-400">

                No recent activity.

              </p>

            )}

          </div>

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
    `${user.firstName || ""} ${user.surname || ""
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
    .map(
      (word) => word[0]
    )
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/*
 * =========================================================
 * FORMAT STATUS
 * =========================================================
 */

function formatStatus(status) {
  const normalizedStatus =
    String(
      status || ""
    ).toLowerCase();

  const labels = {
    todo: "To Do",
    progress: "In Progress",
    review: "Review",
    done: "Completed",
  };

  return (
    labels[normalizedStatus] ||
    status ||
    "Unknown"
  );
}

export default ProjectOverview;