import {
  CheckCircle2,
  Clock3,
  FolderKanban,
  ListTodo,
  ArrowRight,
  Users,
  Activity,
  ClipboardCheck,
} from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

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

  const currentUserId = String(
    currentUser?.id || ""
  ).trim();

  /*
   * =========================================================
   * HELPERS
   * =========================================================
   */

  const normalizeId = (value) => {
    if (
      value === null ||
      value === undefined
    ) {
      return "";
    }

    return String(value).trim();
  };

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

  const currentCompanyId =
    getCompanyId(currentUser);

  /*
   * =========================================================
   * PROJECT LEADER ID
   * =========================================================
   */

  const getProjectLeaderId = (project) => {
    return normalizeId(
      project?.projectLeader?.id ||
      project?.leader?.id ||
      project?.projectLead?.id ||
      project?.lead?.id ||
      project?.projectLeaderId ||
      project?.leaderId ||
      project?.projectLeadId ||
      project?.leadId
    );
  };

  /*
   * =========================================================
   * TASK PROJECT ID
   * =========================================================
   */

  const getTaskProjectId = (task) => {
    return normalizeId(
      task?.project?.id ||
      task?.projectId
    );
  };

  /*
   * =========================================================
   * TASK COMPANY ID
   * =========================================================
   */

  const getTaskCompanyId = (task) => {
    const projectCompanyId =
      getCompanyId(task?.project);

    return normalizeId(
      projectCompanyId ||
      task?.company?.id ||
      task?.companyId ||
      task?.company?.companyId
    );
  };

  /*
   * =========================================================
   * EMPLOYEE ACCESSIBLE PROJECTS
   * =========================================================
   */

  const myProjects = projects.filter(
    (project) => {
      const projectId =
        normalizeId(project?.id);

      const hasProjectIdAccess =
        Array.isArray(
          currentUser?.projectIds
        ) &&
        currentUser.projectIds.some(
          (id) =>
            normalizeId(id) ===
            projectId
        );

      const isProjectMember =
        Array.isArray(
          project?.members
        ) &&
        project.members.some(
          (member) =>
            normalizeId(member?.id) ===
            currentUserId
        );

      return (
        hasProjectIdAccess ||
        isProjectMember
      );
    }
  );

  /*
   * =========================================================
   * PROJECT LEAD PROJECTS
   * =========================================================
   */

  const myLedProjects =
    projects.filter(
      (project) => {
        const projectCompanyId =
          getCompanyId(project);

        const sameCompany =
          currentCompanyId === "" ||
          projectCompanyId === "" ||
          projectCompanyId ===
          currentCompanyId;

        const explicitLeaderId =
          getProjectLeaderId(project);

        const isExplicitLeader =
          explicitLeaderId !== "" &&
          explicitLeaderId ===
          currentUserId;

        const isLeaderMember =
          Array.isArray(
            project?.members
          ) &&
          project.members.some(
            (member) => {
              const memberId =
                normalizeId(
                  member?.id
                );

              const memberRole =
                normalizeId(
                  member?.role
                ).toUpperCase();

              return (
                memberId ===
                currentUserId &&
                memberRole ===
                ROLES.PROJECT_LEAD
              );
            }
          );

        return (
          sameCompany &&
          (
            isExplicitLeader ||
            isLeaderMember
          )
        );
      }
    );

  /*
   * =========================================================
   * PROJECT IDS
   * =========================================================
   */

  const employeeProjectIds =
    new Set(
      myProjects.map(
        (project) =>
          normalizeId(
            project?.id
          )
      )
    );

  const projectLeadProjectIds =
    new Set(
      myLedProjects.map(
        (project) =>
          normalizeId(
            project?.id
          )
      )
    );

  /*
   * =========================================================
   * EMPLOYEE TASKS
   * =========================================================
   */

  const myTasks = tasks.filter(
    (task) => {
      const assigneeId =
        normalizeId(
          task?.assignee?.id ||
          task?.assigneeId
        );

      const projectId =
        getTaskProjectId(task);

      return (
        assigneeId ===
        currentUserId &&
        employeeProjectIds.has(
          projectId
        )
      );
    }
  );

  /*
   * =========================================================
   * PROJECT LEAD TASKS
   * =========================================================
   */

  const myLedTasks =
    tasks.filter(
      (task) => {
        const projectId =
          getTaskProjectId(task);

        const taskCompanyId =
          getTaskCompanyId(task);

        const sameCompany =
          currentCompanyId === "" ||
          taskCompanyId === "" ||
          taskCompanyId ===
          currentCompanyId;

        return (
          sameCompany &&
          projectLeadProjectIds.has(
            projectId
          )
        );
      }
    );

  /*
   * =========================================================
   * COMPANY DATA
   * =========================================================
   */

  const companyProjects =
    currentCompanyId !== ""
      ? projects.filter(
        (project) =>
          getCompanyId(
            project
          ) ===
          currentCompanyId
      )
      : projects;

  const companyProjectIds = new Set(
  companyProjects.map((project) =>
    normalizeId(project?.id)
  )
);

const companyTasks =
  currentCompanyId !== ""
    ? tasks.filter((task) => {
        const taskProjectId =
          getTaskProjectId(task);

        return companyProjectIds.has(
          taskProjectId
        );
      })
    : tasks;

  const companyMembers =
    currentCompanyId !== ""
      ? members.filter(
        (member) =>
          getCompanyId(
            member
          ) ===
          currentCompanyId
      )
      : members;

  /*
   * =========================================================
   * STATUS HELPERS
   * =========================================================
   */

  const normalizeStatus = (status) =>
    normalizeId(status).toUpperCase();

  const isCompletedStatus = (status) =>
    [
      "DONE",
      "COMPLETED",
      "ACCEPTED",
    ].includes(
      normalizeStatus(status)
    );

  const isActiveStatus = (status) =>
    [
      "TODO",
      "IN_PROGRESS",
      "REVIEW",
      "PENDING_APPROVAL",
      "SUBMITTED",
    ].includes(
      normalizeStatus(status)
    );

  /*
   * =========================================================
   * PROJECT STATUS
   * =========================================================
   */

  const getProjectStatusGroup = (
    status
  ) => {
    const normalized =
      normalizeStatus(status);

    if (
      [
        "DONE",
        "COMPLETED",
        "CLOSED",
      ].includes(normalized)
    ) {
      return "Completed";
    }

    if (
      [
        "ON_HOLD",
        "HOLD",
        "PAUSED",
      ].includes(normalized)
    ) {
      return "On Hold";
    }

    if (
      [
        "TODO",
        "PLANNING",
        "PLANNED",
        "NEW",
        "PENDING",
      ].includes(normalized)
    ) {
      return "Planning";
    }

    return "Active";
  };

  /*
   * =========================================================
   * TASK STATUS
   * =========================================================
   */

  const getTaskStatusLabel = (
    status
  ) => {
    switch (
    normalizeStatus(status)
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
        return "Other";
    }
  };

  /*
   * =========================================================
   * ROLE BASED DATA
   * =========================================================
   */

  let dashboardProjects = [];
  let dashboardTasks = [];
  let dashboardEmployees = [];

  if (
    role === ROLES.WEBSITE_ADMIN
  ) {
    dashboardProjects =
      projects;

    dashboardTasks =
      tasks;

    dashboardEmployees =
      members.filter(
        (member) =>
          normalizeStatus(
            member?.role
          ) ===
          ROLES.EMPLOYEE
      );
  }

  else if (
    role === ROLES.COMPANY_HEAD
  ) {
    dashboardProjects =
      companyProjects;

    dashboardTasks =
      companyTasks;

    dashboardEmployees =
  companyMembers.filter(
    (member) => {
      const memberRole =
        normalizeStatus(
          member?.role
        );

      return (
        memberRole === ROLES.EMPLOYEE ||
        memberRole === ROLES.PROJECT_LEAD
      );
    }
  );
  }

  else if (
    role === ROLES.PROJECT_LEAD
  ) {
    dashboardProjects =
      myLedProjects;

    dashboardTasks =
      myLedTasks;

    /*
     * Unique employees working
     * on the Project Lead's projects.
     */

    const ledEmployeeIds =
      new Set();

    myLedProjects.forEach(
      (project) => {
        if (
          Array.isArray(
            project?.members
          )
        ) {
          project.members.forEach(
            (member) => {
              if (
                normalizeStatus(
                  member?.role
                ) ===
                ROLES.EMPLOYEE
              ) {
                const memberId =
                  normalizeId(
                    member?.id
                  );

                if (memberId) {
                  ledEmployeeIds.add(
                    memberId
                  );
                }
              }
            }
          );
        }
      }
    );

    dashboardEmployees =
      members.filter(
        (member) =>
          ledEmployeeIds.has(
            normalizeId(
              member?.id
            )
          )
      );
  }

  /*
   * =========================================================
   * EMPLOYEE TASK COUNTS
   * =========================================================
   */

  const todoTasks =
    myTasks.filter(
      (task) =>
        normalizeStatus(
          task?.status
        ) === "TODO"
    ).length;

  const inProgressTasks =
    myTasks.filter(
      (task) =>
        normalizeStatus(
          task?.status
        ) ===
        "IN_PROGRESS"
    ).length;

  const reviewTasks =
    myTasks.filter(
      (task) =>
        [
          "REVIEW",
          "PENDING_APPROVAL",
          "SUBMITTED",
        ].includes(
          normalizeStatus(
            task?.status
          )
        )
    ).length;

  const completedTasks =
    myTasks.filter(
      (task) =>
        isCompletedStatus(
          task?.status
        )
    ).length;

  /*
   * =========================================================
   * GENERAL COUNTS
   * =========================================================
   */

  const totalProjects =
    dashboardProjects.length;

  const activeTasks =
    dashboardTasks.filter(
      (task) =>
        isActiveStatus(
          task?.status
        )
    ).length;

  const totalCompletedTasks =
    dashboardTasks.filter(
      (task) =>
        isCompletedStatus(
          task?.status
        )
    ).length;

  const employeeCount =
    dashboardEmployees.length;

  const pendingApprovalTasks =
    dashboardTasks.filter(
      (task) =>
        [
          "PENDING_APPROVAL",
          "REVIEW",
          "SUBMITTED",
        ].includes(
          normalizeStatus(
            task?.status
          )
        )
    ).length;

  /*
   * =========================================================
   * PROJECT ANALYTICS
   * =========================================================
   */

  const projectStatusData =
    [
      "Completed",
      "Active",
      "Planning",
      "On Hold",
    ].map((status) => ({
      name: status,
      value:
        dashboardProjects.filter(
          (project) =>
            getProjectStatusGroup(
              project?.status
            ) === status
        ).length,
    }))
      .filter(
        (item) =>
          item.value > 0
      );

  /*
   * =========================================================
   * TASK ANALYTICS
   * =========================================================
   */

  const taskStatusNames = [
    "To Do",
    "In Progress",
    "Review",
    "Completed",
    "Other",
  ];

  const taskStatusData =
    taskStatusNames
      .map((status) => ({
        name: status,
        count:
          dashboardTasks.filter(
            (task) =>
              getTaskStatusLabel(
                task?.status
              ) === status
          ).length,
      }))
      .filter(
        (item) =>
          item.count > 0
      );

  /*
   * =========================================================
   * COMPLETION RATE
   * =========================================================
   */

  const completionRate =
    dashboardTasks.length > 0
      ? Math.round(
        (totalCompletedTasks /
          dashboardTasks.length) *
        100
      )
      : 0;

  /*
   * =========================================================
   * EMPLOYEE TASK ANALYTICS
   * =========================================================
   */

  const employeeTaskStatusData = [
    {
      name: "To Do",
      value: todoTasks,
    },
    {
      name: "In Progress",
      value: inProgressTasks,
    },
    {
      name: "Review",
      value: reviewTasks,
    },
    {
      name: "Completed",
      value: completedTasks,
    },
  ].filter(
    (item) =>
      item.value > 0
  );

  /*
   * =========================================================
   * NAME
   * =========================================================
   */

  const displayName =
    currentUser?.name ||
    `${currentUser?.firstName || ""} ${currentUser?.surname || ""
      }`.trim() ||
    "User";

  /*
   * =========================================================
   * ROLE TITLE
   * =========================================================
   */

  const getRoleTitle = () => {
    switch (role) {
      case ROLES.WEBSITE_ADMIN:
        return "Platform overview";

      case ROLES.COMPANY_HEAD:
        return "Company overview";

      case ROLES.PROJECT_LEAD:
        return "Your project overview";

      case ROLES.EMPLOYEE:
        return "Your work overview";

      default:
        return "Workspace overview";
    }
  };

  /*
   * =========================================================
   * STATUS CARD
   * =========================================================
   */

  const getStatusLabel = (status) => {
    switch (
    normalizeStatus(status)
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

  const getStatusStyle = (status) => {
    switch (
    normalizeStatus(status)
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
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  /*
   * =========================================================
   * NON EMPLOYEE DASHBOARD
   * =========================================================
   */

  if (
    role !== ROLES.EMPLOYEE
  ) {
    return (
      <div className="space-y-6">

        {/* =================================================
            HEADER
        ================================================= */}

        <div>
          <h1 className="text-2xl font-bold">
            Welcome, {displayName}
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {getRoleTitle()}.
          </p>
        </div>


        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <DashboardCard
            icon={
              <FolderKanban
                size={19}
              />
            }
            label="Projects"
            value={totalProjects}
          />

          <DashboardCard
            icon={
              <Activity
                size={19}
              />
            }
            label="Active Tasks"
            value={activeTasks}
          />

          <DashboardCard
            icon={
              <Users
                size={19}
              />
            }
            label={
              role ===
                ROLES.PROJECT_LEAD
                ? "Team Members"
                : "Employees"
            }
            value={employeeCount}
          />

          <DashboardCard
            icon={
              <CheckCircle2
                size={19}
              />
            }
            label="Completed"
            value={
              totalCompletedTasks
            }
          />

        </div>


        {/* =================================================
            ANALYTICS
        ================================================= */}

        <div className="grid gap-6 xl:grid-cols-2">

          {/* Project Status */}

          <AnalyticsCard
            title="Project Status"
            subtitle={
              role ===
                ROLES.PROJECT_LEAD
                ? "Projects you lead"
                : role ===
                  ROLES.COMPANY_HEAD
                  ? "Projects in your company"
                  : "Platform project overview"
            }
          >

            {projectStatusData.length >
              0 ? (
              <ResponsiveContainer
                width="100%"
                height={280}
              >
                <PieChart>

                  <Pie
                    data={
                      projectStatusData
                    }
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {projectStatusData.map(
                      (entry, index) => (
                        <Cell
                          key={`project-${index}`}
                          fill={
                            PIE_COLORS[
                            index %
                            PIE_COLORS.length
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChart
                message="No project data available"
              />
            )}

          </AnalyticsCard>


          {/* Task Status */}

          <AnalyticsCard
            title="Task Status"
            subtitle={
              role ===
                ROLES.PROJECT_LEAD
                ? "Tasks across your projects"
                : "Current task distribution"
            }
          >

            {taskStatusData.length >
              0 ? (
              <ResponsiveContainer
                width="100%"
                height={280}
              >
                <BarChart
                  data={
                    taskStatusData
                  }
                  margin={{
                    top: 10,
                    right: 10,
                    left: -20,
                    bottom: 10,
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="name"
                    tick={{
                      fontSize: 11,
                    }}
                  />

                  <YAxis
                    allowDecimals={
                      false
                    }
                    tick={{
                      fontSize: 11,
                    }}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="count"
                    name="Tasks"
                    fill="#6366f1"
                    radius={[
                      5,
                      5,
                      0,
                      0,
                    ]}
                  />

                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChart
                message="No task data available"
              />
            )}

          </AnalyticsCard>

        </div>


        {/* =================================================
            COMPLETION + PROJECT SNAPSHOT
        ================================================= */}

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Completion */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold">
                  Task Completion
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Overall workspace progress
                </p>

              </div>

              <ClipboardCheck
                size={20}
                className="text-indigo-500"
              />

            </div>


            <div className="mt-6">

              <div className="flex items-end justify-between">

                <span className="text-4xl font-bold">
                  {completionRate}%
                </span>

                <span className="text-xs text-slate-400">
                  {totalCompletedTasks} of{" "}
                  {dashboardTasks.length}
                </span>

              </div>

              <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all"
                  style={{
                    width: `${completionRate}%`,
                  }}
                />

              </div>

            </div>

          </div>


          {/* Pending Approval */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold">
                  Pending Review
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Work waiting for review
                </p>

              </div>

              <Clock3
                size={20}
                className="text-amber-500"
              />

            </div>

            <p className="mt-6 text-4xl font-bold">
              {pendingApprovalTasks}
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/tasks")
              }
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400"
            >
              View Tasks
              <ArrowRight size={14} />
            </button>

          </div>


          {/* Quick access */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">

            <div>

              <p className="text-sm font-semibold">
                Workspace
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Quick access
              </p>

            </div>

            <div className="mt-5 space-y-2">

              <QuickAction
                label="Projects"
                icon={
                  <FolderKanban
                    size={15}
                  />
                }
                onClick={() =>
                  navigate("/projects")
                }
              />

              <QuickAction
                label="Tasks"
                icon={
                  <ListTodo
                    size={15}
                  />
                }
                onClick={() =>
                  navigate("/tasks")
                }
              />

            </div>

          </div>

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
          Welcome, {displayName}
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Here's an overview of your assigned projects and tasks.
        </p>

      </div>


      {/* =================================================
          SUMMARY
      ================================================= */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <DashboardCard
          icon={
            <FolderKanban
              size={19}
            />
          }
          label="My Projects"
          value={
            myProjects.length
          }
        />

        <DashboardCard
          icon={
            <ListTodo
              size={19}
            />
          }
          label="To Do"
          value={todoTasks}
        />

        <DashboardCard
          icon={
            <Clock3
              size={19}
            />
          }
          label="In Progress"
          value={inProgressTasks}
        />

        <DashboardCard
          icon={
            <CheckCircle2
              size={19}
            />
          }
          label="Completed"
          value={completedTasks}
        />

      </div>


      {/* =================================================
          EMPLOYEE ANALYTICS
      ================================================= */}

      <div className="grid gap-6 lg:grid-cols-2">

        <AnalyticsCard
          title="My Task Status"
          subtitle="Your current task distribution"
        >

          {employeeTaskStatusData.length >
            0 ? (
            <ResponsiveContainer
              width="100%"
              height={280}
            >
              <PieChart>

                <Pie
                  data={
                    employeeTaskStatusData
                  }
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {employeeTaskStatusData.map(
                    (entry, index) => (
                      <Cell
                        key={`employee-${index}`}
                        fill={
                          PIE_COLORS[
                          index %
                          PIE_COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart
              message="No task data available"
            />
          )}

        </AnalyticsCard>


        <AnalyticsCard
          title="My Task Progress"
          subtitle="Completion across your assigned work"
        >

          <div className="flex h-[280px] flex-col justify-center">

            <div className="text-center">

              <p className="text-5xl font-bold">
                {myTasks.length >
                  0
                  ? Math.round(
                    (completedTasks /
                      myTasks.length) *
                    100
                  )
                  : 0}
                %
              </p>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                task completion
              </p>

            </div>

            <div className="mx-auto mt-8 w-full max-w-md">

              <div className="h-4 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
                  style={{
                    width: `${myTasks.length >
                        0
                        ? Math.round(
                          (completedTasks /
                            myTasks.length) *
                          100
                        )
                        : 0
                      }%`,
                  }}
                />

              </div>

              <div className="mt-3 flex justify-between text-xs text-slate-400">

                <span>
                  {completedTasks} completed
                </span>

                <span>
                  {myTasks.length} total
                </span>

              </div>

            </div>

          </div>

        </AnalyticsCard>

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
              navigate(
                "/my-projects"
              )
            }
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400"
          >
            View All
            <ArrowRight
              size={14}
            />
          </button>

        </div>


        {myProjects.length >
          0 ? (

          <div className="divide-y divide-slate-200 dark:divide-slate-800">

            {myProjects
              .slice(0, 5)
              .map((project) => {

                const projectTaskCount =
                  myTasks.filter(
                    (task) =>
                      getTaskProjectId(
                        task
                      ) ===
                      normalizeId(
                        project?.id
                      )
                  ).length;

                return (
                  <div
                    key={project.id}
                    className="flex items-center justify-between px-5 py-4"
                  >

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                        <FolderKanban
                          size={18}
                        />
                      </div>

                      <div className="min-w-0">

                        <p className="truncate text-sm font-semibold">
                          {project.name}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                          {project.code ||
                            project.id}
                        </p>

                      </div>

                    </div>

                    <span className="shrink-0 text-xs text-slate-400">
                      {projectTaskCount} tasks
                    </span>

                  </div>
                );
              })}

          </div>

        ) : (

          <EmptySection
            icon={
              <FolderKanban
                size={30}
              />
            }
            title="No projects assigned"
            text="You currently don't have any assigned projects."
          />

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
              navigate(
                "/my-tasks"
              )
            }
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400"
          >
            View All
            <ArrowRight
              size={14}
            />
          </button>

        </div>


        {myTasks.length >
          0 ? (

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
                        Due{" "}
                        {task.dueDate}
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

          <EmptySection
            icon={
              <CheckCircle2
                size={30}
              />
            }
            title="No tasks assigned"
            text="You currently don't have any assigned tasks."
          />

        )}

      </div>

    </div>
  );
}


/*
 * =========================================================
 * COLORS
 * =========================================================
 */

const PIE_COLORS = [
  "#6366f1",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];


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


/*
 * =========================================================
 * ANALYTICS CARD
 * =========================================================
 */

function AnalyticsCard({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">

      <div className="mb-2">

        <h2 className="font-semibold">
          {title}
        </h2>

        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>

      </div>

      {children}

    </div>
  );
}


/*
 * =========================================================
 * EMPTY CHART
 * =========================================================
 */

function EmptyChart({
  message,
}) {
  return (
    <div className="flex h-[280px] items-center justify-center text-sm text-slate-400">
      {message}
    </div>
  );
}


/*
 * =========================================================
 * QUICK ACTION
 * =========================================================
 */

function QuickAction({
  label,
  icon,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
    >

      <span className="flex items-center gap-2">

        <span className="text-indigo-500">
          {icon}
        </span>

        {label}

      </span>

      <ArrowRight size={14} />

    </button>
  );
}


/*
 * =========================================================
 * EMPTY SECTION
 * =========================================================
 */

function EmptySection({
  icon,
  title,
  text,
}) {
  return (
    <div className="px-5 py-10 text-center">

      <div className="text-slate-400">
        {icon}
      </div>

      <p className="mt-3 text-sm font-medium">
        {title}
      </p>

      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        {text}
      </p>

    </div>
  );
}


export default Dashboard;