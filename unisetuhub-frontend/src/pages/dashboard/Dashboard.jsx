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
import { useMembers } from "../../context/MemberContext";
import { ROLES } from "../../constants/roles";

import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { currentUser } = useAuth();
  const { tasks = [] } = useTasks();
  const { projects = [] } = useProjects();
  const { members = [] } = useMembers();

  const navigate = useNavigate();

  const role = currentUser?.role;

  const currentUserId = String(currentUser?.id || "");

  /*
   * =========================================================
   * HELPERS
   * =========================================================
   */

  const normalizeId = (value) =>
    value === null || value === undefined
      ? ""
      : String(value).trim();

  const getCompanyId = (object) => {
    if (!object) {
      return "";
    }

    return normalizeId(
      object?.company?.id ||
      object?.companyId ||
      object?.company?.companyId
    );
  };

  const currentCompanyId = getCompanyId(currentUser);

  const getProjectLeaderId = (project) => {
    return normalizeId(
      project?.leader?.id ||
      project?.projectLead?.id ||
      project?.lead?.id ||
      project?.leaderId ||
      project?.projectLeadId ||
      project?.leadId
    );
  };

  const getTaskProjectId = (task) => {
    return normalizeId(
      task?.project?.id ||
      task?.projectId
    );
  };

  const getTaskCompanyId = (task) => {
    const taskProjectCompanyId = getCompanyId(
      task?.project
    );

    return normalizeId(
      taskProjectCompanyId ||
      task?.company?.id ||
      task?.companyId ||
      task?.company?.companyId
    );
  };

  const getMemberCompanyId = (member) => {
    return getCompanyId(member);
  };

  /*
   * =========================================================
   * EMPLOYEE ACCESSIBLE PROJECTS
   * =========================================================
   */

  const myProjects = projects.filter((project) => {
    const projectId = normalizeId(project?.id);

    const hasProjectIdAccess =
      currentUser?.projectIds?.some(
        (id) =>
          normalizeId(id) === projectId
      ) === true;

    const isProjectMember =
      project?.members?.some(
        (member) =>
          normalizeId(member?.id) ===
          currentUserId
      ) === true;

    return (
      hasProjectIdAccess ||
      isProjectMember
    );
  });

  /*
   * =========================================================
   * PROJECT LEAD PROJECTS
   * =========================================================
   */

  const myLedProjects = projects.filter(
    (project) => {
      const projectCompanyId =
        getCompanyId(project);

      const leaderId =
        getProjectLeaderId(project);

      const sameCompany =
        !currentCompanyId ||
        !projectCompanyId ||
        projectCompanyId === currentCompanyId;

      return (
        sameCompany &&
        leaderId === currentUserId
      );
    }
  );

  /*
   * =========================================================
   * PROJECT IDS FOR ACCESS SCOPING
   * =========================================================
   */

  const employeeProjectIds = new Set(
    myProjects.map((project) =>
      normalizeId(project?.id)
    )
  );

  const projectLeadProjectIds = new Set(
    myLedProjects.map((project) =>
      normalizeId(project?.id)
    )
  );

  /*
   * =========================================================
   * EMPLOYEE TASKS
   * =========================================================
   *
   * Employee sees only:
   * - tasks assigned to them
   * - tasks belonging to accessible projects
   *
   */

  const myTasks = tasks.filter((task) => {
    const assigneeId = normalizeId(
      task?.assignee?.id ||
      task?.assigneeId
    );

    const projectId =
      getTaskProjectId(task);

    return (
      assigneeId === currentUserId &&
      employeeProjectIds.has(projectId)
    );
  });

  /*
   * =========================================================
   * PROJECT LEAD TASKS
   * =========================================================
   *
   * Project Lead sees only tasks from projects
   * they lead.
   *
   */

  const myLedTasks = tasks.filter((task) => {
    const projectId =
      getTaskProjectId(task);

    const taskCompanyId =
      getTaskCompanyId(task);

    const sameCompany =
      !currentCompanyId ||
      !taskCompanyId ||
      taskCompanyId === currentCompanyId;

    return (
      sameCompany &&
      projectLeadProjectIds.has(projectId)
    );
  });

  /*
   * =========================================================
   * COMPANY DATA
   * =========================================================
   *
   * Company Head sees only their company.
   *
   */

  const companyProjects =
    currentCompanyId
      ? projects.filter((project) => {
          const projectCompanyId =
            getCompanyId(project);

          return (
            projectCompanyId ===
            currentCompanyId
          );
        })
      : projects;

  const companyTasks =
    currentCompanyId
      ? tasks.filter((task) => {
          const taskCompanyId =
            getTaskCompanyId(task);

          return (
            taskCompanyId ===
            currentCompanyId
          );
        })
      : tasks;

  const companyMembers =
    currentCompanyId
      ? members.filter((member) => {
          const memberCompanyId =
            getMemberCompanyId(member);

          return (
            memberCompanyId ===
            currentCompanyId
          );
        })
      : members;

  /*
   * =========================================================
   * GENERAL TASK STATUS
   * =========================================================
   */

  const isActiveStatus = (status) => {
    return [
      "TODO",
      "IN_PROGRESS",
      "REVIEW",
      "PENDING_APPROVAL",
      "SUBMITTED",
    ].includes(
      normalizeId(status).toUpperCase()
    );
  };

  const isCompletedStatus = (status) => {
    return [
      "DONE",
      "COMPLETED",
      "ACCEPTED",
    ].includes(
      normalizeId(status).toUpperCase()
    );
  };

  /*
   * =========================================================
   * EMPLOYEE TASK COUNTS
   * =========================================================
   */

  const todoTasks = myTasks.filter(
    (task) =>
      normalizeId(task?.status).toUpperCase() ===
      "TODO"
  ).length;

  const inProgressTasks = myTasks.filter(
    (task) =>
      normalizeId(task?.status).toUpperCase() ===
      "IN_PROGRESS"
  ).length;

  const reviewTasks = myTasks.filter(
    (task) =>
      [
        "REVIEW",
        "PENDING_APPROVAL",
        "SUBMITTED",
      ].includes(
        normalizeId(task?.status).toUpperCase()
      )
  ).length;

  const completedTasks = myTasks.filter(
    (task) =>
      isCompletedStatus(task?.status)
  ).length;

  /*
   * =========================================================
   * ROLE BASED DASHBOARD COUNTS
   * =========================================================
   */

  let dashboardProjects = [];
  let dashboardTasks = [];
  let dashboardEmployees = [];

  if (role === ROLES.WEBSITE_ADMIN) {
    /*
     * Website Admin
     * Full platform scope.
     */

    dashboardProjects = projects;
    dashboardTasks = tasks;

    dashboardEmployees = members.filter(
      (member) =>
        normalizeId(member?.role).toUpperCase() ===
        ROLES.EMPLOYEE
    );
  } else if (role === ROLES.COMPANY_HEAD) {
    /*
     * Company Head
     * Company scope only.
     */

    dashboardProjects =
      companyProjects;

    dashboardTasks =
      companyTasks;

    dashboardEmployees =
      companyMembers.filter(
        (member) =>
          normalizeId(member?.role).toUpperCase() ===
          ROLES.EMPLOYEE
      );
  } else if (role === ROLES.PROJECT_LEAD) {
    /*
     * Project Lead
     * Only projects they lead.
     */

    dashboardProjects =
      myLedProjects;

    dashboardTasks =
      myLedTasks;

    dashboardEmployees = members.filter(
      (member) => {
        const memberCompanyId =
          getMemberCompanyId(member);

        return (
          normalizeId(
            member?.role
          ).toUpperCase() ===
            ROLES.EMPLOYEE &&
          (
            !currentCompanyId ||
            !memberCompanyId ||
            memberCompanyId ===
              currentCompanyId
          )
        );
      }
    );
  }

  /*
   * =========================================================
   * NON-EMPLOYEE DASHBOARD COUNTS
   * =========================================================
   */

  const totalProjects =
    dashboardProjects.length;

  const activeTasks =
    dashboardTasks.filter((task) =>
      isActiveStatus(task?.status)
    ).length;

  const totalCompletedTasks =
    dashboardTasks.filter((task) =>
      isCompletedStatus(task?.status)
    ).length;

  const employeeCount =
    dashboardEmployees.length;

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
      normalizeId(status).toUpperCase()
    ) {
      case "TODO":
        return "To Do";

      case "IN_PROGRESS":
        return "In Progress";

      case "REVIEW":
      case "PENDING_APPROVAL":
      case "SUBMITTED":
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
      normalizeId(status).toUpperCase()
    ) {
      case "TODO":
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300";

      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400";

      case "REVIEW":
      case "PENDING_APPROVAL":
      case "SUBMITTED":
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
   */

  if (role !== ROLES.EMPLOYEE) {
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
            value={totalProjects}
          />

          <DashboardCard
            label="Active Tasks"
            value={activeTasks}
          />

          <DashboardCard
            label="Employees"
            value={employeeCount}
          />

          <DashboardCard
            label="Completed"
            value={totalCompletedTasks}
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
              navigate("/my-projects")
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
              .map((project) => {

                const projectTaskCount =
                  myTasks.filter(
                    (task) =>
                      getTaskProjectId(task) ===
                      normalizeId(project?.id)
                  ).length;

                return (
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
                      {projectTaskCount} tasks
                    </span>

                  </div>
                );
              })}

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
              navigate("/my-tasks")
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
